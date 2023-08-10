import React, { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import { useParams } from "react-router-dom";
import { getApi } from "../services/httpServices";
import Loader from "../components/Loader";


const Blogs = () => {
  let { id } = useParams();

  const [blogs, setBlogs] = useState([]);

  const [loading, setLoading] = useState(true);

  let localUserId = localStorage.getItem("userId");

  const getBlogs = async () => {
    try {
      const data = id ? await getApi(`/api/v1/blog/user-blog/${id}`) : await getApi("/api/v1/blog/all-blog");
      setLoading(false)
      if (data?.success) {
        id ? setBlogs(data?.blogs) : setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    id ? getBlogs() : getBlogs();
  }, [id]);

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
            <div className="row">
              {
                loading ? (<Loader />) : (<h3 className="fw-bold text-danger text-center">No Blogs Available!!!</h3>)
              }
            </div>
          )
      }
    </div>
  );
};

export default Blogs;
