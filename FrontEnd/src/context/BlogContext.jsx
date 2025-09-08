import { createContext, useState, useEffect } from "react";
import axios from "axios";

const BlogContext = createContext();

const BlogProvider = ({ children }) => {
  const baseUrl = "http://localhost:5000/api";

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseUrl}/Home`);
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPostById = async (id) => {
    try {
      const res = await axios.get(`${baseUrl}/Home/${id}`);
      return res.data;
    } catch (err) {
      console.error("Error fetching post", err);
    }
  };

  const login = async (username, password) => {
    try {
      const res = await axios.post(`${baseUrl}/Admin/login`, {
        Username: username,
        Password: password,
      });
      const newToken = res.data?.Token || "dummy-token";
      setToken(newToken);
      localStorage.setItem("token", newToken);
      return true;
    } catch (err) {
      console.error("Login failed", err);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const createPost = async (post) => {
    try {
      const res = await axios.post(`${baseUrl}/Admin/create`, post);
      fetchPosts();
      return res.data;
    } catch (err) {
      console.error("Error creating post", err);
    }
  };

  const editPost = async (id, post) => {
    try {
      await axios.put(`${baseUrl}/Admin/edit/${id}`, post);
      fetchPosts();
    } catch (err) {
      console.error("Error editing post", err);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`${baseUrl}/Admin/delete/${id}`);
      fetchPosts();
    } catch (err) {
      console.error("Error deleting post", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <BlogContext.Provider
      value={{
        posts,
        loading,
        login,
        logout,
        createPost,
        editPost,
        deletePost,
        fetchPostById,
        token,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export { BlogContext, BlogProvider };
