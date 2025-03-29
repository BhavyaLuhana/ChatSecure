const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const CryptoJS = require('crypto-js');
const { GridFSBucket } = require('mongodb');
const connectDB = require('./database/db');
const Grid = require('gridfs-stream');
const authRoutes = require('./routes/authRoutes');
const Message = require('./models/message');

dotenv.config();
const SECRET_KEY = process.env.CHAT_SECRET;
if (!SECRET_KEY) {
  console.error("ERROR: SECRET_KEY is missing in .env");
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

connectDB();

const conn = mongoose.connection;
let gfs, gridFSBucket;

conn.once("open", () => {
  gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return {
      filename: `${Date.now()}-${file.originalname}`,
      bucketName: "uploads",
    };
  },
});

const upload = multer({ storage });

const encryptMessage = (text) => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

const decryptMessage = (cipherText) => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8) || "[Decryption Failed]";
  } catch (error) {
    console.error("Decryption error:", error);
    return "[Decryption Error]";
  }
};

app.get("/api/messages/:room", async (req, res) => {
  try {
    const room = req.params.room;
    const messages = await Message.find({ room }).sort({ createdAt: 1 });
    
    const decryptedMessages = messages.map((msg) => ({
      _id: msg._id,
      sender: msg.sender,
      text: decryptMessage(msg.text),
      createdAt: msg.createdAt,
      fileUrl: msg.fileUrl || null,
    }));

    res.status(200).json(decryptedMessages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("joinRoom", async (room) => {
    socket.join(room);
    console.log(`${socket.id} joined room: ${room}`);

    const messages = await Message.find({ room }).sort({ createdAt: 1 });
    const decryptedMessages = messages.map((msg) => ({
      _id: msg._id,
      sender: msg.sender,
      text: decryptMessage(msg.text),
      fileUrl: msg.fileUrl || null,
    }));
    io.to(socket.id).emit("chatHistory", decryptedMessages);
  });

  socket.on("sendMessage", async (data) => {
    console.log("Received Message:", data);
    const encryptedText = encryptMessage(data.text);

    const newMessage = new Message({
      sender: data.sender,
      text: encryptedText,
      room: data.room,
      fileUrl: data.fileUrl || null,
    });

    try {
      const savedMessage = await newMessage.save();
      console.log("Saved Message:", savedMessage);
      io.to(data.room).emit("receiveMessage", {
        messageId: savedMessage._id,
        sender: data.sender,
        text: decryptMessage(encryptedText),
        fileUrl: savedMessage.fileUrl || null,
      });
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("typing", (room) => {
    socket.to(room).emit("userTyping", "Someone is typing...");
  });

  socket.on("stopTyping", (room) => {
    socket.to(room).emit("userStoppedTyping");
  });

  socket.on("messageRead", async (messageId) => {
    await Message.findByIdAndUpdate(messageId, { read: true });
    io.emit("updateMessage", { messageId, read: true });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

app.post('/api/upload', upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  console.log("File uploaded successfully");
  res.status(200).json({ fileUrl: `/download/${req.file.filename}` });
});

app.delete("/api/messages/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMessage = await Message.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({ error: "Message not found" });
    }

    io.emit("deleteMessage", id); 
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ error: "Failed to delete message" });
  }
});

app.use('/api/auth', authRoutes);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});