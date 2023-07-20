import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { useParams } from "react-router-dom";


const Blogs = () => {
  let { id } = useParams();

  const [blogs, setBlogs] = useState([]);

  const [user, setUser] = useState('')

  let localUserId = localStorage.getItem("userId");

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`/api/v1/user/get-user/${localUserId}`);
      if (data?.success) {
        setUser(data?.user?.username);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  //get user blogs
  const getUserBlogs = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //get blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/all-blog");
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBlogs = async () => {
    try {
      const { data } = id ? await axios.get(`/api/v1/blog/user-blog/${id}`) : await axios.get("/api/v1/blog/all-blog");
      if (data?.success) {
        console.log(data);
        id ? setBlogs(data?.userBlog.blogs) : setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    id ? getBlogs() : getBlogs();
  }, [id]);

  console.log(blogs);

  return (
    <div className="container">
      <div className="row">
        <h1 className="text-center fw-bold alert alert-info" role="alert">{id ? "My" : "All"} Blogs</h1>
      </div>
      {
        blogs.length > 0
          ? blogs.map((blog) => (
            <div className="row my-4">
              <BlogCard
                id={blog?._id}
                isUser={localUserId === blog?.user?._id}
                title={blog?.title}
                description={blog?.description}
                image={blog?.image}
                username={blog?.user?.username}
                time={{ post: blog.createdAt, edit: blog.updatedAt }}
              />
            </div>
          )) : (
            <h3 className="fw-bold text-center">No Blogs Available</h3>
          )
      }
    </div>
  );
};

export default Blogs;
