# ?? CatBlog API

CatBlog is a simple ASP.NET Core Web API project built with **Entity Framework Core** and **JWT Authentication**.
It allows admins to create, edit, and delete blog posts, while public users can view posts.

---

## ?? Features

* Public **Home API**:

  * View all posts
  * View post details by ID
* Admin **Authentication**:

  * Login with username & password
  * JWT-based authentication and authorization
* Admin **Dashboard API**:

  * Create new posts
  * Edit existing posts
  * Delete posts
* Built-in **Swagger UI** for testing endpoints
* **CORS** enabled for frontend integration (e.g., React, Vite)

---

## ??? Technologies Used

* [.NET 8](https://dotnet.microsoft.com/)
* [Entity Framework Core](https://learn.microsoft.com/ef/core/)
* [SQL Server](https://www.microsoft.com/sql-server/)
* [JWT Authentication](https://jwt.io/)
* [Swagger / OpenAPI](https://swagger.io/)

---

## ?? Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/CatBlog.git
cd CatBlog
```

### 2. Update database connection

Open **appsettings.json** and configure your SQL Server connection:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=.;Database=CatBlogDB;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

### 3. Apply migrations and seed data

```bash
dotnet ef database update
```

This will create the database with:

* Default admin ? username: `admin`, password: `12345`
* Example posts

### 4. Run the project

```bash
dotnet run
```

Default endpoints:

* HTTP ? [http://localhost:5000](http://localhost:5000)
* HTTPS ? [https://localhost:5001](https://localhost:5001)

Swagger UI will be available at:

```
https://localhost:5001/swagger
```

---

## ?? Authentication

### Admin Login

`POST /api/Admin/login`

**Request body:**

```json
{
  "username": "admin",
  "password": "12345"
}
```

**Response:**

```json
{
  "token": "JWT_TOKEN_HERE",
  "expiresAt": "2025-09-06T20:30:00Z"
}
```

Use the token in Authorization header for secured endpoints:

```http
Authorization: Bearer JWT_TOKEN_HERE
```

---

## ?? API Endpoints

### Public (No Auth)

* `GET /api/Home` ? list all posts
* `GET /api/Home/{id}` ? get post details

### Admin (Requires JWT)

* `POST /api/Admin/create` ? create a post
* `PUT /api/Admin/edit/{id}` ? edit a post
* `DELETE /api/Admin/delete/{id}` ? delete a post

---

## ?? Frontend Example

A React (Vite) frontend can consume this API using:

```bash
npm create vite@latest my-catblog-frontend -- --template react
npm install axios react-router-dom
```

Then fetch posts from:

```js
axios.get("https://localhost:5001/api/Home")
```

---

## ?? Project Structure

```bash
CatBlog/
?? Controllers/
?   ?? AdminController.cs   # Admin auth + CRUD posts
?   ?? HomeController.cs    # Public posts
?? Data/
?   ?? CatBlogContext.cs    # EF Core DbContext + seed data
?? Models/
?   ?? Post.cs
?   ?? Admin.cs
?   ?? LoginViewModel.cs
?   ?? ErrorViewModel.cs
?? Program.cs               # App configuration, JWT, Swagger, CORS
?? appsettings.json         # DB & JWT config
```

---

## ?? License

This project is for educational purposes. You can modify and use it freely.
