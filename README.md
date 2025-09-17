# 🌟 CatBlog

CatBlog is a full-stack blog platform featuring a dynamic frontend built with Vite and React, and a robust backend built with ASP.NET Core Web API. The frontend provides a visitor-facing blog and an admin dashboard for managing posts, while the backend handles CRUD operations and JWT-based authentication. The project includes a clean, responsive UI powered by Material-UI and custom CSS, and a backend with Entity Framework Core and SQL Server for data persistence.

---

## 📑 Table of Contents

- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 Features

- **Public Blog**:
  - View all blog posts
  - View post details by ID
- **Admin Dashboard**:
  - Create, edit, and delete blog posts
  - JWT-based authentication for secure access
- **Frontend**:
  - Responsive, dark-themed UI with Material-UI components
  - Blog post cards with alternating layouts
  - Protected routes for admin access
- **Backend**:
  - RESTful API with Entity Framework Core and SQL Server
  - Swagger UI for API testing
  - CORS enabled for frontend integration
- **Authentication**:
  - Admin login with username and password
  - JWT tokens with expiration for secure API access

---

## 🛠️ Technologies Used

### **Frontend**
- **Vite**: Fast build tool for modern web projects
- **React**: JavaScript library for building user interfaces (with Hooks)
- **React Router**: Declarative routing for React applications
- **Material-UI (MUI)**: React component library for UI elements (Dialogs, Buttons, TextFields, etc.)
- **Axios**: Promise-based HTTP client for API requests
- **CSS**: Custom styles for a dark-themed, responsive UI

### **Backend**
- **.NET 8**: Framework for building the Web API
- **Entity Framework Core**: ORM for database interactions
- **SQL Server**: Relational database for storing posts and admin data
- **JWT Authentication**: Secure token-based authentication
- **Swagger/OpenAPI**: API documentation and testing interface

### **Development Tools**
- **ESLint**: Linting tool for frontend code quality
- **Vite Plugin React**: For React Fast Refresh in Vite
- **dotnet CLI**: For backend project management and migrations
- **SQL Server Management Studio (SSMS)**: For database management (optional)

---

## 📂 Project Structure

```
CatBlog/
├── backend/                        # ASP.NET Core Web API
│   ├── Controllers/                # API controllers
│   │   ├── AdminController.cs      # Admin auth and CRUD operations
│   │   └── HomeController.cs       # Public post endpoints
│   ├── Data/                       # Database context
│   │   └── CatBlogContext.cs       # EF Core DbContext with seed data
│   ├── Models/                     # Data models
│   │   ├── Post.cs                 # Post model
│   │   ├── Admin.cs                # Admin model
│   │   ├── LoginViewModel.cs       # Login request model
│   │   └── ErrorViewModel.cs       # Error response model
│   ├── Program.cs                  # API configuration (JWT, CORS, Swagger)
│   ├── appsettings.json            # DB and JWT configuration
│   └── CatBlog.csproj              # Backend project file
├── frontend/                       # Vite + React frontend
│   ├── public/                     # Public assets
│   │   └── images/                 # Static images (e.g., fallback.jpg)
│   ├── src/                        # Source code
│   │   ├── components/             # Reusable components
│   │   │   ├── Navbar.jsx          # Navigation bar
│   │   │   ├── PostCard.jsx        # Blog post card
│   │   │   └── ProtectedRoute.jsx  # Protected route component
│   │   ├── context/                # Blog state management
│   │   │   ├── BlogContext.jsx     # Blog context and provider
│   │   │   └── useBlog.jsx         # Custom hook for blog context
│   │   ├── pages/                  # Page-level components
│   │   │   ├── Home.jsx            # Home page with post list
│   │   │   ├── Admin.jsx           # Admin dashboard
│   │   │   ├── Login.jsx           # Admin login page
│   │   │   └── PostDetails.jsx     # Post details page
│   │   ├── App.jsx                 # Main app with routing
│   │   ├── main.jsx                # App entry point
│   │   ├── routes.jsx              # Route definitions
│   │   └── index.css               # Global styles
│   ├── .env                        # Frontend environment variables
│   ├── vite.config.js              # Vite configuration
│   └── package.json                # Frontend dependencies
├── .gitignore                      # Files to ignore in Git
├── README.md                       # This file
└── LICENSE                         # License file
```

---

## 🚀 Getting Started

### **Prerequisites**
- **Node.js** (>= 18.x) and **npm** for the frontend
- **.NET 8 SDK** for the backend
- **SQL Server** (local or remote) for the database
- **Git** for cloning the repository

### **Installation**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/CatBlog.git
   cd CatBlog
   ```

2. **Set up the backend**:
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Update the database connection string in `appsettings.json`:
     ```json
     "ConnectionStrings": {
       "DefaultConnection": "Server=.;Database=CatBlogDB;Trusted_Connection=True;TrustServerCertificate=True;"
     }
     ```
   - Apply Entity Framework migrations to create the database and seed data:
     ```bash
     dotnet ef database update
     ```
     This seeds:
     - Default admin: username `admin`, password `12345`
     - Example blog posts
   - Run the backend:
     ```bash
     dotnet run
     ```
     The API will be available at:
     - HTTP: `http://localhost:5000`
     - HTTPS: `https://localhost:5001`
     - Swagger UI: `https://localhost:5001/swagger`

3. **Set up the frontend**:
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```
     The frontend will be available at `http://localhost:5173` (or the port specified by Vite).

4. **Ensure connectivity**:
   - The frontend assumes the backend API is running at `http://localhost:5000/api`. Update the `VITE_API_URL` in the frontend’s `.env` file if necessary.

5. **Deployment**:
   - **Backend**: Deploy to platforms like Azure, AWS, or Heroku. Ensure the SQL Server database is accessible.
   - **Frontend**: Build static files with `npm run build` and deploy to Vercel, Netlify, or GitHub Pages.

---

## 🔧 Environment Variables

### **Backend**
In `backend/appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=.;Database=CatBlogDB;Trusted_Connection=True;TrustServerCertificate=True;"
  },
  "Jwt": {
    "Key": "YourSecretKeyHere",
    "Issuer": "CatBlog",
    "Audience": "CatBlog"
  }
}
```
- `DefaultConnection`: SQL Server connection string.
- `Jwt:Key`: Secret key for JWT signing (replace with a secure key in production).
- `Jwt:Issuer` and `Jwt:Audience`: JWT metadata for token validation.

### **Frontend**
In `frontend/.env`:
```
VITE_API_URL=http://localhost:5000/api
```
- `VITE_API_URL`: Base URL for the backend API. Update if the backend is hosted elsewhere.

> **Note**: Ensure the backend is running and CORS is configured to allow requests from the frontend’s URL (e.g., `http://localhost:5173`).

---

## 🌐 API Endpoints

### **Public (No Authentication)**
- `GET /api/Home`: List all blog posts
- `GET /api/Home/{id}`: Get details for a specific post by ID

### **Admin (Requires JWT Authentication)**
- `POST /api/Admin/login`: Authenticate admin and return JWT
  - **Request Body**:
    ```json
    {
      "username": "admin",
      "password": "12345"
    }
    ```
  - **Response**:
    ```json
    {
      "token": "JWT_TOKEN_HERE",
      "expiresAt": "2025-09-06T20:30:00Z"
    }
    ```
- `POST /api/Admin/create`: Create a new post
  - **Request Body**:
    ```json
    {
      "Title": "New Post",
      "Content": "This is a new post.",
      "ImageUrl": "https://example.com/image.jpg"
    }
    ```
- `PUT /api/Admin/edit/{id}`: Update an existing post
  - **Request Body**: Same as create
- `DELETE /api/Admin/delete/{id}`: Delete a post by ID

> **Note**: For admin endpoints, include the JWT in the `Authorization` header:
> ```
> Authorization: Bearer JWT_TOKEN_HERE
> ```

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

## 📜 License

This project is for educational purposes. You can modify and use it freely.

---

> Built with ❤️ for creating a full-stack blog platform with a modern, secure, and user-friendly interface.