// import { useBlog } from "../context/useBlog";
import useBlog from "../context/useBlog";

import PostCard from "../components/PostCard";

export default function Home() {
  const { posts, loading } = useBlog();

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1>Cat Blog 🐱</h1>
      {posts.map((post) => (
        <PostCard key={post.Id} post={post} />
      ))}
    </div>
  );
}
