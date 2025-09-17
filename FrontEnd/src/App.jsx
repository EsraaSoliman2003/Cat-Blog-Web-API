import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BlogProvider } from "./context/BlogContext";
import Home from "./pages/Home";
import PostDetails from "./pages/PostDetails";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import "./i18n";
import { useState } from "react";

function App() {
  const [lang, setLang] = useState(localStorage.getItem("language") || "en");

  return (
    <BlogProvider>
      <BrowserRouter>
        <Navbar lang={lang} setLang={setLang} />
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
                <Admin lang={lang} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </BlogProvider>
  );
}

export default App;
