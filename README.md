Family Social Media App 👨‍👩‍👧‍👦

This is a full-stack MERN (MongoDB, Express.js, React, Node.js) application that functions as a private family and friends social media platform. Users can register, log in securely using JWT authentication, manage profiles, add friends, comment on posts, and interact within a closed network.
🚀 Features

    User Authentication (JWT + Cookies + LocalStorage)

        Login, Register, and Logout functionality

        Automatic login if token exists (via Redux automaticLogin)

    Protected Routes with React Router & Redux

        Access control to dashboard and friends page

    User Dashboard

        Navbar visible after login

        Home page showing posts and comments

    Friend System

        Send and accept friend requests

        View all users (People page)

    Profile Page

        View user profile with profile picture and username

    Comments

        Comment on posts (via CommentBox component)

    State Management with Redux Toolkit

        Slices for user authentication and friend management

    Form Validation (Zod) on Backend

    Styling with Tailwind CSS

📂 Project Structure
Frontend (React + Redux Toolkit)

/Frontend
├── components
│   ├── authentication
│   │   ├── loginpage
│   │   │   └── login.js
│   │   ├── registerpage
│   │   │   └── register.js
│   │   ├── logout
│   │   │   └── Logout.js
│   │   └── privateRoutes
│   │       └── PrivateRoute.js
│   ├── userDashboard
│   │   └── HomePage
│   │       ├── HomePage.js
│   │       └── Navbar.js
│   ├── manageFriends
│   │   └── People.js
│   ├── ProfilePage
│   │   └── profile.js
│   └── CommentBox
│       └── CommentBox.js
├── features
│   ├── user
│   │   └── userSlice.js
│   └── Friend
│       └── friendsSlice.js
├── App.js
└── index.js

Backend (Node.js + Express + MongoDB)

/server
├── models
│   └── userModel.js
├── controllers
│   └── userController.js
├── middlewares
│   └── authMiddleware.js
├── routes
│   └── userRoutes.js
├── validation
│   └── userValidation.js
└── index.js

⚙️ Technologies Used
Frontend:

    React.js

    React Router DOM

    Redux Toolkit

    Axios

    Tailwind CSS

    React Icons

    React Toastify

    js-cookie

Backend:

    Node.js

    Express.js

    MongoDB & Mongoose

    JWT (jsonwebtoken)

    bcrypt

    Zod (schema validation)

🔐 Authentication Flow

    User logs in — JWT token is received and saved in localStorage.

    On app load, automaticLogin checks for token and fetches user info.

    Private routes are guarded using PrivateRoute.

    Logout clears Redux state and localStorage, redirects to /login.

🛠️ Setup Instructions
1. Clone the repository

git clone https://github.com/yourusername/family-social-media-app.git
cd family-social-media-app

2. Backend Setup

cd server
npm install
touch .env

Add to .env:

PORT=3002
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

Start server:

npm start

3. Frontend Setup

cd ../Frontend
npm install
npm start

📌 Routes Summary
Frontend
Route	Component	Description
/	Redirect	Redirect to /home or /login
/login	LoginForm	Login page
/register	RegisterForm	Register page
/home	HomePage	Protected route after login
/requests	People	See all other users
/logout	Logout	Logout and clear session
/userProfile/:id	UserProfile	View user profile
/commentbox	CommentBox	Comment system
✅ To Do (Future Enhancements)

    Real-time notifications (Socket.IO)

    Post creation and likes

    Chat between friends

    Image uploads with Cloudinary

    Responsive design for mobile

👨‍💻 Author

Abhishek Dahal
A full-stack developer passionate about building connected social platforms and learning deeply about authentication and data flow.
