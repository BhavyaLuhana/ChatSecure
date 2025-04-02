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
│   ├── styles/
│   ├── hooks/
│   ├── assets/
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

``'

## Future Enhancements

🚀 **End-to-End Encrypted Group Chats**
🚀 **Message Deletion & Expiry Features**
🚀 **Push Notifications for New Messages**

INSTALL ALL THE PACKAGES:

RUN "xargs npm install < backend.txt" in the backend directory
RUN "xargs npm install < frontend.txt" in the frontend directory

