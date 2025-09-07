import { Link } from "react-router-dom";
import useBlog from "../context/useBlog";

export default function Navbar() {
  const { token, login } = useBlog();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        background: "#222",
        color: "#fff",
      }}
    >
      {/* Logo */}
      <h2>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          🐱 CatBlog
        </Link>
      </h2>

      {/* Links */}
      <div style={{ display: "flex", gap: "15px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/admin" style={{ color: "white", textDecoration: "none" }}>
          Admin
        </Link>

        {/* Login/Logout */}
        {token ? (
          <button
            onClick={() => window.location.reload()} // بسيطة عشان تعملي reset
            style={{
              background: "crimson",
              border: "none",
              color: "white",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => login("admin", "1234")}
            style={{
              background: "seagreen",
              border: "none",
              color: "white",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
