import { Link } from "react-router-dom";
import useBlog from "../context/useBlog";

export default function Navbar() {
  const { token, logout } = useBlog();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        background: "#222",
        color: "#fff",
        height: "40px",
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
        {token ? (
          <>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              Home
            </Link>
            <Link
              to="/admin"
              style={{ color: "white", textDecoration: "none" }}
            >
              DashBoard
            </Link>
            <button
              onClick={logout}
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
          </>
        ) : (
          <Link
            to="/login"
            style={{
              background: "seagreen",
              border: "none",
              color: "white",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer",
              textDecoration: "none"
            }}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
