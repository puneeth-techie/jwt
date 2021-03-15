import User from "../models/userModel.js";
import { generateToken, refreshToken } from "../utils/generateToken.js";
import verifyToken from "../middlewares/verifyToken.js";
import createError from "http-errors";
import { validateUserSchema } from "../utils/validateSchema.js";

const register = async (req, res, next) => {
  try {
    const { error } = await validateUserSchema.validateAsync(req.body);
    if (error) throw createError.BadRequest(error.details[0].message);
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user)
      throw createError.Conflict(`${email} already registered. Please login.`);

    user = await User.create({ name, email, password });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      rToken: refreshToken(user._id),
    });
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  try {
    if (!user)
      throw createError.NotFound(
        `${email} is not registered. Please register.`
      );
    const isMatch = user.isValidPassword(user.password);
    if (!isMatch) {
      throw createError.Unauthorized("Invalid email and password.");
    } else {
      const token = generateToken(user._id);
      const rToken = refreshToken(user._id);
      res.status(201).json({
        Success: {
          message: "Successfully logged in.",
          token: token,
          rToken: rToken,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const logout = (req, res, next) => {
  res.send("Logout route");
};

const refreshAuthToken = async (req, res, next) => {
  const { rToken } = req.body;
  try {
    const user = await verifyToken(rToken);
    if (!user) throw createError.Unauthorized();
    const token = generateToken(user._id);
    const refToken = refreshToken(user._id);
    res.json({
      tokens: {
        accessToken: token,
        refreshToken: refToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getProfile = (req, res, next) => {
  res.send("Now in protected route.");
};

export { register, login, logout, refreshAuthToken, getProfile };
