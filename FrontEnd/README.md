# 🌟 CatBlog

A dynamic blog platform built with Vite and React, featuring a visitor-facing blog, an admin dashboard for managing posts, and user authentication. The frontend communicates with a backend API to handle CRUD operations for blog posts, with a clean, responsive, and modern UI powered by Material-UI and custom CSS.

---

## 📑 Table of Contents

- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Technologies Used](#-technologies-used)
- [Environment Variables](#-environment-variables)
- [Contributing](#-contributing)

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js (>= 18.x)
- npm
- A backend API server running at `http://localhost:5000/api` (or your custom URL) to handle blog post and authentication requests

### **Installation**

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd catblog
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Ensure the backend API is running and accessible at the configured `baseUrl` (default: `http://localhost:5000/api`).

The static files will be generated in the `dist/` directory, ready for deployment on platforms like **Vercel**, **Netlify**, or **GitHub Pages**.

---

## 📂 Project Structure

```
catblog/
├── public/                 # Public assets (images, favicon, etc.)
│   └── images/             # Static images (e.g., fallback.jpg)
├── src/
│   ├── components/         # Reusable components
│   │   ├── Navbar.jsx         # Navigation bar component
│   │   ├── PostCard.jsx       # Blog post card component
│   │   └── ProtectedRoute.jsx # Component for protected routes
│   ├── context/            # Context for blog state management
│   │   ├── BlogContext.jsx # Blog context and provider
│   │   └── useBlog.jsx     # Custom hook for accessing blog context
│   ├── pages/              # Page-level components
│   │   ├── Home.jsx           # Home page with blog post list
│   │   ├── Admin.jsx          # Admin dashboard for managing posts
│   │   ├── Login.jsx          # Login page for admin access
│   │   └── PostDetails.jsx    # Post details page
│   ├── App.jsx             # Main app component with routing
│   ├── main.jsx            # Entry point of the app
│   ├── routes.jsx          # Centralized route definitions (using React Router)
│   └── index.css           # Global styles
├── .env                    # Environment variables
├── vite.config.js          # Vite configuration
├── package.json            # Project metadata and dependencies
├── README.md               # This file
└── .gitignore              # Files to ignore in Git
```

---

## 🛠️ Technologies Used

### **Frontend**
- **Vite**: Fast build tool for modern web projects
- **React**: JavaScript library for building user interfaces (with Hooks)
- **React Router**: Declarative routing for React applications
- **Material-UI (MUI)**: React component library for UI elements (Dialogs, Buttons, TextFields, etc.)
- **i18next + react-i18next**: Internationalization and translation support for multiple languages (English & Arabic)
- **Axios**: Promise-based HTTP client for API requests
- **CSS**: Custom styles for a dark-themed, responsive UI

### **Backend Services**
- **Custom Backend API**: Assumed to be running at `http://localhost:5000/api` for blog post management and authentication (not included in this repository)

### **Development Tools**
- **ESLint**: Linting tool for code quality and consistency
- **Vite Plugin React**: For React Fast Refresh in Vite

---

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following key:

```
VITE_API_URL=http://localhost:5000/api
```

- `VITE_API_URL`: The base URL for your backend API (e.g., `http://localhost:5000/api`). Update this if your backend is hosted elsewhere.

> **Note:** The backend API is responsible for handling blog post CRUD operations and authentication. Ensure it is properly configured and running to enable full functionality.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Make your changes and commit:
   ```bash
   git commit -m 'Add your feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request.

---

> Built with ❤️ for creating and managing a dynamic blog platform with a modern and user-friendly interface.