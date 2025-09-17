import useBlog from "../context/useBlog";
import PostCard from "../components/PostCard";

export default function Home() {
  const { posts, loading } = useBlog();

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <div
          style={{
            border: "6px solid #f3f3f3",
            borderTop: "6px solid #3498db",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            animation: "spin 1s linear infinite",
          }}
        />
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );

  return (
    <div
      style={{
        paddingTop: "20px",
      }}
    >
      {posts.map((post, index) => (
        <PostCard key={post.Id} post={post} index={index} />
      ))}
    </div>
  );
}
