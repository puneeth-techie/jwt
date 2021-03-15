import jwt from "jsonwebtoken";
import createError from "http-errors";

const verifyToken = async (token) => {
  try {
    if (token) {
      return jwt.verify(token, process.env.REFRESH_TOKEN);
    } else {
      return createError.Unauthorized();
    }
  } catch (error) {
    throw error;
  }
};

export default verifyToken;
