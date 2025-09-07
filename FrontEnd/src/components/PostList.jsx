import PostCard from "./PostCard";

export default function PostList({ posts, onDelete, isAdmin }) {
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onDelete={onDelete} isAdmin={isAdmin} />
      ))}
    </div>
  );
}
