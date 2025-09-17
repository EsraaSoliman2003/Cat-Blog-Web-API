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
  const [expiresAt, setExpiresAt] = useState(
    () => localStorage.getItem("expiresAt") || null
  );

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  useEffect(() => {
    if (token && expiresAt) {
      const remainingTime = new Date(expiresAt).getTime() - Date.now();

      if (remainingTime > 0) {
        const timer = setTimeout(() => {
          logout();
        }, remainingTime);

        return () => clearTimeout(timer);
      } else {
        logout();
      }
    }
  }, [token, expiresAt]);

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

      const newToken = res.data?.Token || null;
      const expires = res.data?.ExpiresAt || null;

      if (newToken && expires) {
        setToken(newToken);
        setExpiresAt(expires);

        localStorage.setItem("token", newToken);
        localStorage.setItem("expiresAt", expires);

        const remainingTime = new Date(expires).getTime() - Date.now();
        if (remainingTime > 0) {
          setTimeout(() => {
            logout();
          }, remainingTime);
        }
      }

      return true;
    } catch (err) {
      console.error("Login failed", err);
      return false;
    }
  };

  const isTokenValid = () => {
    if (!token || !expiresAt) return false;
    const now = new Date();
    return now < new Date(expiresAt);
  };

  const logout = () => {
    setToken(null);
    setExpiresAt(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
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
        isTokenValid,
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
