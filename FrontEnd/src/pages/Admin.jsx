import { useState } from "react";
import useBlog from "../context/useBlog";

export default function Admin() {
  const { login, createPost, posts, deletePost } = useBlog();
  const [form, setForm] = useState({ title: "", content: "", imageUrl: "" });

  const handleLogin = async () => {
    const success = await login("admin", "1234");
    if (success) alert("Login successful!");
  };

  const handleCreate = async () => {
    await createPost(form);
    setForm({ title: "", content: "", imageUrl: "" });
  };

  return (
    <div className="p-4">
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogin}>Login</button>

      <h3>Create Post</h3>
      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={form.imageUrl}
        onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
      />
      <button onClick={handleCreate}>Add Post</button>

      <h3>All Posts</h3>
      {posts.map((p) => (
        <div key={p.id}>
          <p>{p.title}</p>
          <button onClick={() => deletePost(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
