import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="border p-3 mb-3 rounded shadow-sm">
      <h3>{post.title}</h3>
      {/* <p>{post.content.substring(0, 100)}...</p> */}
      <Link to={`/post/${post.Id}`}>Read more</Link>
    </div>
  );
}
