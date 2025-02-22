import bcrypt from "bcrypt";
import env from "dotenv";
import jwt from "jsonwebtoken";
import { studentCollection } from "../model/user.model.mjs";
import mongoose from "mongoose";

env.config();


export const signUp = async (req, res) => {
  try {
    const { body } = req;

  
    const usernameCount = await studentCollection.countDocuments({ username: body.username });
    if (usernameCount > 0) {
      return res.status(409).send({ message: "Username already exists" });
    }

   
    body.password = await bcrypt.hash(body.password, 10);
    
   
    const response = await studentCollection.create(body);
    if (!response?._id) {
      return res.status(400).send({ message: "Bad request" });
    }

    response.password = undefined;
   
    let jwtKey;
    switch (response.role) {
      case "admin":
        jwtKey = process.env.JWT_KEY_ADMIN;
        break;
      case "provider":
        jwtKey = process.env.JWT_KEY_PROVIDER;
        break;
      case "student":
      default:
        jwtKey = process.env.JWT_KEY_STUDENT;
        break;
    }

    const token = jwt.sign({ id: response._id, role: response.role }, jwtKey, { expiresIn: "30d" });

    return res.status(201).send({ message: "User created!", user: response, token });
  } catch (err) {
    return res.status(500).send({ message: err.message || "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await studentCollection.findOne({ username });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    user.password = undefined; 

  
    let jwtKey;
    switch (user.role) {
      case "admin":
        jwtKey = process.env.JWT_KEY_ADMIN;
        break;
      case "provider":
        jwtKey = process.env.JWT_KEY_PROVIDER;
        break;
      case "student":
      default:
        jwtKey = process.env.JWT_KEY_STUDENT;
        break;
    }

   
    const token = jwt.sign({ id: user._id, role: user.role }, jwtKey, { expiresIn: "7d" });

    return res.status(200).send({ message: "User logged in", user, token });
  } catch (err) {
    return res.status(500).send({ message: err.message || "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, password, username, age, qualification, preferredLanguage } = req.body;

    const user = await studentCollection.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await studentCollection.findByIdAndUpdate(
      userId,
      {
        name,
        username,
        age,
        qualification,
        preferredLanguage,
        ...(password && { password: hashedPassword }),
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.status(200).send({
      message: "Profile updated",
      updatedUser: {
        ...updatedUser._doc,
        password: null,
      },
    });
  } catch (err) {
    return res.status(500).send({ message: err.message || "Internal server error" });
  }
};

    
  export const getUserDetails = async (req, res) => {
    try {
      const { userId } = req.params; 
  
     
      const user = await studentCollection.findById(userId);
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
  
      return res.status(200).send({ user });
    } catch (err) {
      return res.status(500).send({ message: err.message || "Internal server error" });
    }
  };

export default {
  signUp,
  login,
  getUserDetails,
  updateUser


};
