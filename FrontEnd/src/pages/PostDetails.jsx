import { useParams } from "react-router-dom";
import useBlog from "../context/useBlog";
import { useEffect, useState } from "react";

export default function PostDetails() {
  const { Id } = useParams();
  const { fetchPostById } = useBlog();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const load = async () => {
      const data = await fetchPostById(Id);
      setPost(data);
    };
    load();
  }, [Id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2>{post.title}</h2>
      <img src={post.imageUrl} alt={post.title} style={{ maxWidth: "400px" }} />
      <p>{post.content}</p>
    </div>
  );
}