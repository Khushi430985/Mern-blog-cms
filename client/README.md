# 📰 MERN Blog CMS

A lightweight **Content Management System (Blog App)** built using the **MERN stack** (MongoDB, Express, React, Node.js).  
It allows an **Admin** to manage blog posts (create, edit, delete, publish), while **public users** can view only the published blogs.

---

## 🚀 Features

- 🔐 **Admin Authentication** (JWT + Cookies)  
- 📝 **Create, Edit, Delete Posts**  
- 🌓 **Draft & Publish System**  
- 🌍 **Public Blog Pages** – read-only view for all visitors  
- ☁️ **MongoDB Atlas** for cloud database  
- 🎨 **Bootstrap 5 Styling** – simple & responsive UI  
- ⚙️ **Secure Environment Variables** (not pushed to GitHub)  

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React (Vite) + Bootstrap 5 |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB Atlas |
| **Authentication** | JWT + Cookies |
| **Version Control** | Git + GitHub |

---

## ⚡ Getting Started (Run Locally)

### 🖥️ 1. Clone the project
```bash
git clone https://github.com/Khushi430985/Mern-blog-cms.git
cd mern-blog-cms
```


### 📦 2. Install dependencies
Backend setup
cd server
npm install

Frontend setup
cd ../client
npm install

### 🔧 3. Configure environment variables
Create a .env file inside the server/ folder and add:
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
ALLOW_SIGNUP=false


### ▶️ 4. Start the project
Run backend
cd server
npm run dev

Run frontend
cd ../client
npm run dev

Now open your browser and go to 👉 http://localhost:5173



👩‍💻 Author
Khushi Sharma


### Summary
A clean and minimal MERN Blog CMS that demonstrates CRUD operations, JWT authentication, and public/private routing — perfect for learning or showcasing MERN stack skills.
