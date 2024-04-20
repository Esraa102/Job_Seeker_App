import { customError } from "../utils/customError.js";
import jwt from "jsonwebtoken";

export const verfiyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    next(
      customError(res.status(403), "Your are unathorized, you need to log in")
    );
  } else {
    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
      if (err) {
        next(customError(res.status(400), "Invalid Token"));
      }
      req.user = decoded;
      next();
    });
  }
};
