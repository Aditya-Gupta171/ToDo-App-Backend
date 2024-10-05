import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendcookie } from "../utils/feature.js";

// export const getallusers = async (req, res) => {};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("Invalid email or password", 400));
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return next(new ErrorHandler("Invalid email or password", 400));
    sendcookie(user, res, `welcome back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("user already exist", 400));
    const hashpassword = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      email,
      password: hashpassword,
    });
    sendcookie(user, res, "Registered successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const getmyprofile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", { expires: new Date(Date.now()),
      samesite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
      secure: process.env.NODE_ENV === "DEVELOPMENT" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};
// export const updatedetails = async (req, res) => {
//   const { id } = req.params;
//   const user = await User.findById(id);
//   res.json({
//     success: true,
//     message: "updated",
//   });
// };

// export const deletedetails = async (req, res) => {
//   const { id } = req.params;
//   const user = await User.findByIdAndDelete(id);

//   res.json({
//     success: true,
//     message: "Deleted",
//   });
// };

// export const specialfunc = (req, res) => {
//   res.json({
//     success: true,
//     message: "Just Joking",
//   });
// };
