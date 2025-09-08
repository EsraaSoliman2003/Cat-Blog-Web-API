import { Link } from "react-router-dom";



export default function PostCard({ post, index }) {
  return (
    <div
      className={`card ${index % 2 === 0 ? "even" : "odd"}`}
      style={{
        backgroundColor: "#1c1c1c",
        color: "#e0e0e0",
        borderRadius: "12px",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.6)",
        marginBottom: "2rem",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        overflow: "hidden",
        maxWidth: "800px",
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        alignItems: "stretch",
        flexDirection: index % 2 === 0 ? "row" : "row-reverse",
      }}
    >
      <img
        src={post.ImageUrl}
        alt={post.Title}
        style={{
          width: "300px",
          height: "auto",
          objectFit: "cover",
          borderRadius:
            index % 2 === 0 ? "12px 0 0 12px" : "0 12px 12px 0",
        }}
      />
      <div
        className="card-body"
        style={{
          padding: "1.5rem",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: index % 2 === 0 ? "flex-end" : "flex-start",
          alignSelf: "center",
          textAlign: "center",
        }}
      >
        <h5
          style={{
            fontSize: "1.5rem",
            marginBottom: "0.75rem",
            fontWeight: 600,
          }}
        >
          {post.Title}
        </h5>
        <p
          style={{
            fontSize: "1rem",
            color: "#bbbbbb",
            marginBottom: "1rem",
            lineHeight: 1.6,
          }}
        >
          {post.Content.substring(0, 50)}...
        </p>
        <Link
          to={`/post/${post.Id}`}
          style={{
            backgroundColor: "#00d4ff",
            color: "#121212",
            border: "1px solid #00aacc",
            fontWeight: "bold",
            padding: "0.5rem 1.5rem",
            borderRadius: "8px",
            textDecoration: "none",
            transition: "0.3s",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#33e5ff";
            e.target.style.borderColor = "#00ccee";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#00d4ff";
            e.target.style.borderColor = "#00aacc";
          }}
        >
          Read More
        </Link>
      </div>
    </div>
  );
}
