import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getUser } from "../services/storageServices";
import { getApi, postApi, putApi } from "../services/httpServices";

const CreateBlog = () => {

  // GETTING USER ID FROM LOCAL STORAGE
  const userId = getUser();

  const { id } = useParams();

  const navigate = useNavigate();


  const [inputs, setInputs] = useState({ title: "", description: "", image: "" });



  // ---------------------------------------------------------------------------------- IF UPDATING STARTS

  const getBlogDetail = async () => {
    try {
      const data = await getApi(`/api/v1/blog/get-blog/${id}`);
      if (data?.success) {
        setInputs({
          title: data?.blog.title,
          description: data?.blog.description,
          image: data?.blog.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    id ? getBlogDetail() : setInputs({
      title: "",
      description: "",
      image: ""
    });
  }, [id]);




  // ---------------------------------------------------------------------------------- If Updating Ends


  // input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };


  // --------------------------------------------------------------- HANDLING FORM SUBMIT

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = id ? await putApi(`/api/v1/blog/update-blog/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
      }) : await postApi("/api/v1/blog/create-blog", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: userId,
      })
      if (data?.success) {
        toast.success(`Blog ${id ? "Updated" : "Created"} Successfully`);
        navigate("/blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="my-5 mx-auto border border-3 rounded rounded-5 shadow-lg p-5 blog-creation">
          <div className="row" >
            <h1 className="text-center fw-bold text-muted">{id ? "Edit" : "Create"} Blog</h1>
          </div>
          <div className="row">
            <div className="mb-3">
              <div class="form-group">
                <label htmlFor="title" className="form-label fw-bold fs-4">Title</label>
                <input type="text" className="form-control" id="title" name="title" value={inputs.title} placeholder="Title" onChange={handleChange}
                  required />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="mb-3">
              <div className="form-group">
                <label htmlFor="description" className="form-label fw-bold fs-4">Description</label>
                <textarea className="form-control" rows="5" id="description" name="description" placeholder="Description" value={inputs.description}
                  onChange={handleChange} required />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="mb-3">
              <label htmlFor="image" className="form-label fw-bold fs-4"> Image URL </label>
              <input type="text" className="form-control" id="image" name="image" value={inputs.image} placeholder="Image URL" onChange={handleChange} required />
            </div>
          </div>
          <div className="row">
            <div className="text-center">
              <button type="submit" className="btn btn-primary">{id ? "Update" : "Submit"}</button>
            </div>
          </div>
        </div>
      </form >
    </div>
  );
};

export default CreateBlog;
