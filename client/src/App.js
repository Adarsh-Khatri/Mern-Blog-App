import './App.css'
import Header from "./components/Header";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateBlog from "./pages/CreateBlog";
import { Toaster } from "react-hot-toast";
import DeleteBlog from './components/DeleteBlog';


function App() {

  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/my-blogs/:id" element={<Blogs />} />
        <Route path="/blog-details/:id" element={<CreateBlog />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/delete-blog/:id" element={<DeleteBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
