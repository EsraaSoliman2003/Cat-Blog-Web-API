import { useParams, Link } from "react-router-dom";
import useBlog from "../context/useBlog";
import { useTranslation } from "react-i18next";

export default function PostDetails() {
  const { Id } = useParams();
  const { posts } = useBlog();
  const post = posts.find((p) => p.Id.toString() === Id);
  const { t } = useTranslation();


  if (!post)
    return (
      <p style={{ color: "white", textAlign: "center" }}>Post not found</p>
    );

  return (
    <div
      style={{
        backgroundColor: "#1c1c1c",
        color: "#e0e0e0",
        borderRadius: "12px",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.6)",
        maxWidth: "800px",
        margin: "1rem auto",
        padding: "1rem",
        overflow: "hidden",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "600",
          textAlign: "center",
          marginBottom: "1rem",
        }}
      >
        {post.Title}
      </h2>

      <img
        src={post.ImageUrl || "/images/fallback.jpg"}
        alt={post.Title}
        style={{
          width: "100%",
          maxWidth: "300px",
          height: "auto",
          objectFit: "cover",
          borderRadius: "12px",
          display: "block",
          margin: "0 auto 1.5rem",
        }}
      />

      <div style={{ textAlign: "center" }}>
        <p
          style={{
            fontSize: "1.1rem",
            color: "#bbbbbb",
            marginBottom: "1rem",
          }}
        >
          {post.Content || "No content available."}
        </p>

        <Link
          to="/"
          style={{
            backgroundColor: "#555555",
            color: "#e0e0e0",
            border: "1px solid #444444",
            fontWeight: "bold",
            padding: "0.5rem 1.5rem",
            borderRadius: "8px",
            textDecoration: "none",
            transition: "0.3s",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#666666";
            e.target.style.borderColor = "#555555";
            e.target.style.color = "#ffffff";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#555555";
            e.target.style.borderColor = "#444444";
            e.target.style.color = "#e0e0e0";
          }}
        >
          {t("back")}
        </Link>
      </div>
    </div>
  );
}
