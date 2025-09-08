import useBlog from "../context/useBlog";
import PostCard from "../components/PostCard";

export default function Home() {
  const { posts, loading } = useBlog();

  if (loading) return <p>Loading...</p>;

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
