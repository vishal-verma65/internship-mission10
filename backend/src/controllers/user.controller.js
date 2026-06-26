import User from "../models/user.js";

// POST /users
export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    res.status(201).json({ 
      success: true, 
      data: user 
    });
  } 
  catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ 
        success: false, 
        message: "Email already exists" 
      });
    }
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// GET /users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ 
      success: true, 
      count: users.length, 
      data: users 
    });
  } 
  catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// GET /users/:id
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }
    res.status(200).json({ 
      success: true, 
      data: user 
    });
  } 
  catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// DELETE /users/:id
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }
    res.status(200).json({ 
      success: true, 
      message: "User deleted successfully" 
    });
  } 
  catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};