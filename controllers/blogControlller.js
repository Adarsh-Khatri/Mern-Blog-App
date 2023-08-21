const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

// ------------------------------------------------------------------------------------- GET ALL BLOGS


exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find().populate("user");
    if (!blogs) {
      return res.status(200).send({
        success: false,
        message: "No Blogs Found",
      });
    }
    return res.status(200).send({
      success: true,
      BlogCount: blogs.length,
      message: "All Blogs Lists",
      blogs,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error While Getting All Blogs",
      error,
    });
  }
};


// ---------------------------------------------------------------------------------- CREATE NEW BLOG


exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
    //validation
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "Please Provide ALl Fields",
      });
    }
    const exisitingUser = await userModel.findById(user);
    //validaton
    if (!exisitingUser) {
      return res.status(404).send({
        success: false,
        message: "unable to find user",
      });
    }

    const newBlog = new blogModel({ title, description, image, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    exisitingUser.blogs.push(newBlog._id);
    await exisitingUser.save({ session });
    await session.commitTransaction();
    await newBlog.save();
    return res.status(201).send({
      success: true,
      message: "Blog Created!",
      newBlog,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Error While Creating blog",
      error,
    });
  }
};


// --------------------------------------------------------------------------------------- UPDATE BLOG


exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true }).populate("user")
    return res.status(200).send({
      success: true,
      message: "Blog Updated!",
      blog,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Error While Updating Blog",
      error,
    });
  }
};


// -------------------------------------------------------------------------------------------- GET SINGLE BLOG


exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "blog not found with this is ID",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Got Blog By Id",
      blog,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Error while getting single blog",
      error,
    });
  }
};


// ------------------------------------------------------------------------------------------- DELETE BLOG


exports.deleteBlogController = async (req, res) => {
  try {
    const blog = await blogModel
      .findByIdAndDelete(req.params.id)
      .populate("user");
    await blog.user.blogs.pull(blog._id);
    await blog.user.save();
    return res.status(200).send({
      success: true,
      message: "Blog Deleted Successfully",
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Erorr While Deleteing Blog",
      error,
    });
  }
};


// ----------------------------------------------------------------------------------------------------- GET USER BLOGS


exports.userBlogController = async (req, res) => {
  try {
    let userBlog = await userModel.findById(req.params.id).populate("blogs");
    let populatedBlog = [];

    async function populateUserField() {
      for (const blog of userBlog.blogs) {
        try {
          const user = await blog.populate("user");
          populatedBlog.push(user)
        } catch (error) {
          console.error('Error populating user:', error.message);
        }
      }
    }

    populateUserField()

    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: "blogs not found with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "user blogs",
      blogs: populatedBlog,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "error in user blog",
      error,
    });
  }
};
