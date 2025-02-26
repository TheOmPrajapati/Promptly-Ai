# **PromptlyAI - AI Chat Platform** 🚀  

**PromptlyAI** is an AI-powered chatbot platform built using **MERN Stack** (MongoDB, Express.js, React.js, Node.js) with **Gemini AI API** for generating AI responses. 

It features **user authentication (JWT & Google OAuth), chat history management, session handling, and real-time chat functionalities**.

## **📌 Features**
✅ **AI-Powered Chat** – Get responses from **Gemini AI API** dynamically.  
✅ **User Authentication** – Secure login/signup using **JWT & Google OAuth**.  
✅ **Chat History Management** – Store chat history in **cloud storage (Firebase/Free Cloud Storage)**.  
✅ **Session Management** – "Remember Me" feature using **express-session & JWT**.  
✅ **Chat UI Inspired by ChatGPT** – Smooth & user-friendly chat UI.  
✅ **Chat Sidebar** – Manage past conversations with edit/delete options.  
✅ **Markdown Support** – AI responses support **bold, italic, code blocks, and lists**.  
✅ **Code Block with Copy Feature** – Easily copy AI-generated code snippets.  
✅ **Password Reset via OTP** – Secure password recovery through email OTP.  
✅ **Lazy Loading & Performance Optimization** – Optimized performance using React Suspense & lazy loading.  

## **🛠️ Tech Stack**
### **Frontend**
- ⚛️ **React.js** – Frontend framework  
- 🎨 **Tailwind CSS** – UI styling  
- 🚀 **React Router** – Routing  
- 🔥 **React Icons** – Icons  
- ⏳ **React Lazy Loading & Suspense** – Performance optimization  

### **Backend**
- 🖥 **Node.js** – Server-side runtime  
- 🌐 **Express.js** – Web framework  
- 🔐 **JWT Authentication** – Secure login  
- 🔑 **Passport.js (Google OAuth)** – Google Login  
- 🛢 **MongoDB** – Database (Only storing user credentials, not chats)  
- 💾 **Firebase / Cloud Storage** – Storing Chat History  
- 📧 **Nodemailer** – Sending OTP for password reset  

## **📦 Folder Structure**
```md
├── 📂 Backend
│   ├── 📂 Config          # Configuration files (DB, OAuth)
│   ├── 📂 Controllers     # Business logic for routes
│   ├── 📂 Middleware      # Authentication middleware
│   ├── 📂 Models          # Mongoose schemas
│   ├── 📂 Routes          # Express API routes
│   ├── 📂 Services        # Utility functions (email sending, etc.)
│   ├── server.js          # Entry point for backend
│   ├── package.json       # Dependencies
│
├── 📂 Frontend
│   ├── 📂 src
│   │   ├── 📂 components  # Reusable UI components
│   │   ├── 📂 pages       # Page components (Login, Home, Chat)
│   │   ├── 📂 routes      # Protected/Public Routes
│   │   ├── App.js         # Main app component
│   │   ├── index.js       # Entry point for frontend
│   │   ├── index.css      # Global styles
│   ├── package.json       # Dependencies
│
├── .env                   # Environment variables
├── README.md              # Documentation
```

## **🛠️ Installation & Setup**
### **🔹 1️⃣ Clone the Repository**
``` sh
git clone https://github.com/TheOmPrajapati/PromptlyAI.git
cd PromptlyAI
```

### **🔹 2️⃣ Install Backend Dependencies**
``` sh
cd Backend
npm install
```

### **🔹 3️⃣ Setup .env file for Backend**
``` sh
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GEMINI_API_KEY=your_gemini_api_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

### **🔹 4️⃣ Start Backend Server**
``` sh
npm run dev
```

### **Frontend Setup**
### **🔹 5️⃣ Install Frontend Dependencies**
``` sh
cd Frontend
npm install
```

### **🔹 6️⃣ Setup .env file for Frontend**
``` sh
REACT_APP_BACKEND_URL=http://localhost:5000
```

### **🔹 7️⃣ Start Frontend Server**
``` sh
npm start
```

---

## ** 🔌 API Endpoints**
``` md
## **🔌 API Endpoints**
| Method | Endpoint                | Description |
|--------|-------------------------|-------------|
| POST   | `/api/users/register`    | Register a new user |
| POST   | `/api/users/login`       | Login user (JWT Token) |
| GET    | `/api/users/profile`     | Fetch user profile (Protected) |
| POST   | `/auth/google`           | Login with Google |

| Method | Endpoint       | Description |
|--------|---------------|--------------|
| POST   | `/api/chat`   | Send a prompt to Gemini AI |
| GET    | `/api/chats`  | Get user chat history |

| Method | Endpoint                 | Description |
|--------|--------------------------|-------------|
| POST   | `/api/forgot-password`    | Send OTP to email |
| POST   | `/api/reset-password`     | Reset password with OTP |
```

## **🔐 Authentication Flow**
✅ **JWT Authentication**  
1️⃣ User logs in → Backend generates JWT Token  
2️⃣ Token is stored in `localStorage`  
3️⃣ All protected routes require the token  
4️⃣ If token is expired/missing, user is logged out  

✅ **Google OAuth Login**
1️⃣ User clicks **"Sign in with Google"**  
2️⃣ Google returns user info → Backend creates JWT Token  
3️⃣ User redirected to `http://localhost:3000/home?token=YOUR_TOKEN`  
4️⃣ Token stored in `localStorage`  

## **📚 Future Enhancements**
✅ Add **Dark Mode** 🌙  
✅ Enable **Speech-to-Text** (Voice Chat) 🎙  
✅ Improve **AI Response Caching** for Faster Replies ⚡  
✅ Deploy on **Vercel / Netlify** 🚀  

## **📝 License**
This project is **MIT Licensed**. Feel free to use and modify it.

## **📞 Contact**
💬 **For queries, contact:**  
📧 Email: `theprajapatiom@gmail.com`  
🔗 LinkedIn: [Om Prajapati](https://www.linkedin.com/in/om-prajapati-969733266/)  
🔹 GitHub: [TheOmPrajapati](https://github.com/TheOmPrajapati)  
