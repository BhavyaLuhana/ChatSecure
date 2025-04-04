# ChatSecure - Backend Documentation

## Overview

ChatSecure is a **privacy-focused** messaging application designed with **end-to-end encryption**, secure file sharing, and real-time chat capabilities. The backend is built with **Express.js** and integrates **MongoDB**, **WebSockets**, and **encryption protocols** to ensure secure communication.

---

## Tech Stack

- **Backend Framework:** Express.js
- **Database:** MongoDB with GridFS for file storage
- **Authentication:** JWT (JSON Web Tokens) & bcrypt for password hashing
- **Encryption:** Crypto-JS for end-to-end security
- **Real-time Communication:** Socket.io for instant messaging
- **Frontend Framework:** React.js
- **Styling:** Tailwind CSS, Framer Motion (for animations)
- **State Management & API Calls:** Axios, React Router
- **Real-Time Communication:** Socket.io-client
- **UI Enhancements:** React Icons, Emoji Picker, Lottie React

---

## Features

**End-to-End Encrypted Messaging** (AES Encryption using Crypto-JS)

**User Authentication** (JWT-based authentication with password hashing via bcrypt)

**Secure File Sharing** (GridFS for efficient file storage in MongoDB)

**Real-Time Chat** (WebSockets with Socket.io for instant messaging)

**Protected API Routes** (CORS-enabled backend for secure requests)

**Modern UI with Tailwind CSS** (Fully responsive and sleek design)

**Real-Time Chat & Typing Indicators** (Socket.io integration)

**End-to-End Encryption** (Crypto-JS for message security)

**Emoji Support & Animations** (Lottie, Emoji Picker, and Framer Motion)

**Seamless Navigation** (React Router for dynamic page rendering)

---

## Installation & Setup

### 1️⃣ Clone the Repository

```sh
 git clone https://github.com/your-repo/chatsecure.git
 cd chatsecure/backend
```

### 2️⃣ Install Dependencies

```sh
 npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file in the backend directory and configure the following:

```sh
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4️⃣ Start the Backend Server

For development (auto-restarts on code changes):

```sh
 npm run dev
```

For production:

```sh
 npm start


FRONTEND FOLDER STRUCTURE

frontend/
│── src/
│   ├── components/
│   ├── pages/   
│   ├── utils/
│   ├── assets/
│   ├── hooks/
│   ├── index.css
│   ├── App.js
│   ├── main.js
│── public/           
│── tailwind.config.js 


BACKEND FOLDER STRUCTURE

backend/
│── database
│── middleware/
│── models/
│── routes/
│── server.js

```

## Future Enhancements

🚀 **End-to-End Encrypted Group Chats**
🚀 **Message Deletion & Expiry Features**
🚀 **Push Notifications for New Messages**

INSTALL ALL THE PACKAGES:

RUN 

"npm install bcrypt@5.1.1 bcryptjs@3.0.2 cors@2.8.5 crypto-js@4.2.0 dotenv@16.4.7 express@4.21.2 gridfs-stream@1.1.1 jsonwebtoken@9.0.2 mongoose@8.13.1 multer@1.4.4 multer-gridfs-storage@5.0.2 nodemon@3.1.9 socket.io@4.8.1" 

in the backend directory

RUN 

"npm install @tailwindcss/vite autoprefixer axios crypto-js emoji-picker-react framer-motion lottie-react postcss react react-dom react-icons react-router-dom socket.io-client tailwindcss"

in the frontend directory

