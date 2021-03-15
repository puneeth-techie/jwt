import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import createError from "http-errors";

const protect = async (req, res, next) => {
  try {
    if (!req.headers["authorization"]) throw createError.Unauthorized();
    const token = req.headers["authorization"].split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    next(error);
  }
};

export { protect };
