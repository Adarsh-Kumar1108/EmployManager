# EmployManager 🚀

A modern React-based employee management system with secure login, protected routes, and a clean UI using Tailwind CSS.

---

## ✨ Features

- 🔐 Login authentication with token-based session
- 🛡️ Protected routes using React Router
- 🎨 Tailwind CSS for responsive, modern styling
- ⚡ Built with Vite for lightning-fast performance
- 📦 Axios for API requests (reqres.in used as mock backend)
- 📄 Editable user form with route-based navigation

---

## 🧰 Tech Stack

- React
- Vite
- Tailwind CSS
- Axios
- React Router DOM

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/employ-manager.git
cd employ-manager

npm install
npm run dev
Visit: http://localhost:5173



🛡️ Protected Routes
/users – Shows list of users (accessible only if logged in)

/edit/:id – Edit user form (protected)

/ – Login page (auto-redirects if token exists)

All protected routes are wrapped using ProtectedRoute.jsx.



src/
├── api/
│   └── reqresApi.js       # Axios instance
├── components/
│   ├── EditUserForm.jsx
│   └── ProtectedRoute.jsx
├── pages/
│   ├── LoginPage.jsx
│   └── UserPage.jsx
├── assets/
│   └── logo.jpg
├── App.jsx
├── main.jsx
└── index.css              # Tailwind config


🙌 Author
Adarsh Kumar
Frontend Developer | React Enthusiast

