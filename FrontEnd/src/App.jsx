import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BlogProvider } from "./context/BlogContext";
import Home from "./pages/Home";
import PostDetails from "./pages/PostDetails";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BlogProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Visitors */}
          <Route path="/" element={<Home />} />
          <Route path="/post/:Id" element={<PostDetails />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </BlogProvider>
  );
}

export default App;
