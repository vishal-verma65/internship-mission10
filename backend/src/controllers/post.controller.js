import Post from "../models/Post.js";

// POST /posts
export const createPost = async (req, res) => {
  try {
    const { title, content, authorId } = req.body;
    const post = await Post.create({ title, content, authorId });
    res.status(201).json({ 
      success: true, 
      data: post 
    });
  } 
  catch (error) {
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// GET /posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("authorId", "name email");
    res.status(200).json({ 
      success: true, 
      count: posts.length, 
      data: posts 
    });
  } 
  catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// GET /posts/:id
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("authorId", "name email");
    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: "Post not found" 
      });
    }
    res.status(200).json({ 
      success: true, 
      data: post 
    });
  } 
  catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// DELETE /posts/:id
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: "Post not found" 
      });
    }
    res.status(200).json({ 
      success: true, 
      message: "Post deleted successfully" 
    });
  } 
  catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// GET /posts/top/recent
export const getTopRecentPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .populate("authorId", "name email");
    res.status(200).json({ 
      success: true, 
      count: posts.length, 
      data: posts 
    });
  } 
  catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};