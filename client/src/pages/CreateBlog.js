import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const CreateBlog = () => {
  const userId = localStorage.getItem("userId");

  const id = useParams().id;

  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });



  // ---------------------------------------------------------------------------------- If Updating Starts

  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
      if (data?.success) {
        // setBlog(data?.blog);
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

  //form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = id ? await axios.put(`/api/v1/blog/update-blog/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      }) : await axios.post("/api/v1/blog/create-blog", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: userId,
      });
      if (data?.success) {
        toast.success(`Blog ${id ? "Updated" : "Created"} Successfully`);
        navigate("/blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="container"
        style={{
          width: "50%",
          border: "3px solid",
          borderRadius: "10px",
          padding: "20px",
          margin: "auto",
          boxShadow: "10px 10px 20px #ccc",
          marginTop: "30px",
        }}
      >
        <h2
          className="text-center"
          style={{
            fontWeight: "bold",
            padding: "20px",
            color: "gray",
          }}
        >
          {id ? "Edit" : "Create"} A Post
        </h2>
        <div className="mb-3">
          <div class="form-group">
            <label htmlFor="title" className="form-label" style={{ fontSize: "20px", fontWeight: "bold" }}>Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={inputs.title}
              onChange={handleChange}
              placeholder="Title"
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <div className="form-group">
            <label htmlFor="description" className="form-label" style={{ fontSize: "24px", fontWeight: "bold" }}>
              Description
            </label>
            <textarea
              className="form-control"
              rows="5"
              id="description"
              name="description"
              value={inputs.description}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label" style={{ fontSize: "24px", fontWeight: "bold" }}>
            Image URL
          </label>
          <input
            type="text"
            className="form-control"
            id="image"
            name="image"
            value={inputs.image}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">{id ? "Update" : "Submit"}</button>
      </div>
    </form>
  );
};

export default CreateBlog;











































// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
// import toast from "react-hot-toast";
// const CreateBlog = () => {
//   const id = localStorage.getItem("userId");
//   const navigate = useNavigate();
//   const [inputs, setInputs] = useState({
//     title: "",
//     description: "",
//     image: "",
//   });
//   // input change
//   const handleChange = (e) => {
//     setInputs((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };
//   //form
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post("/api/v1/blog/create-blog", {
//         title: inputs.title,
//         description: inputs.description,
//         image: inputs.image,
//         user: id,
//       });
//       if (data?.success) {
//         toast.success("Blog Created");
//         navigate("/my-blogs");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <Box
//           width={"50%"}
//           border={3}
//           borderRadius={10}
//           padding={3}
//           margin="auto"
//           boxShadow={"10px 10px 20px #ccc"}
//           display="flex"
//           flexDirection={"column"}
//           marginTop="30px"
//         >
//           <Typography
//             variant="h2"
//             textAlign={"center"}
//             fontWeight="bold"
//             padding={3}
//             color="gray"
//           >
//             Create A Post
//           </Typography>
//           <InputLabel
//             sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
//           >
//             Title
//           </InputLabel>
//           <TextField
//             name="title"
//             value={inputs.title}
//             onChange={handleChange}
//             margin="normal"
//             variant="outlined"
//             required
//           />
//           <InputLabel
//             sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
//           >
//             Description
//           </InputLabel>
//           <TextField
//             name="description"
//             value={inputs.description}
//             onChange={handleChange}
//             margin="normal"
//             variant="outlined"
//             required
//           />
//           <InputLabel
//             sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
//           >
//             Image URL
//           </InputLabel>
//           <TextField
//             name="image"
//             value={inputs.image}
//             onChange={handleChange}
//             margin="normal"
//             variant="outlined"
//             required
//           />
//           <Button type="submit" color="primary" variant="contained">
//             SUBMIT
//           </Button>
//         </Box>
//       </form>
//     </>
//   );
// };

// export default CreateBlog;
