import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BlogProvider } from "./context/BlogContext";
import Home from "./pages/Home";
import PostDetails from "./pages/PostDetails";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BlogProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:Id" element={<PostDetails />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </BlogProvider>
  );
}

export default App;
