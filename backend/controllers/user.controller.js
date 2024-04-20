import { customError } from "../utils/customError.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const registerUser = async (req, res, next) => {
  const { role, username, email, password, phone } = req.body;
  if (role && username && email && password && phone) {
    try {
      const user = await User.findOne({ email });
      if (user) {
        next(customError(res.status(400), "User is already exist"));
      } else {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = await User.create({
          role,
          email,
          username,
          phone,
          password: hashedPassword,
        });
        const accessToken = jwt.sign(
          {
            _id: newUser._id,
            email: newUser.email,
            role: newUser.role,
            phone: newUser.phone,
            username: newUser.username,
          },
          process.env.ACCESS_SECRET_TOKEN,
          { expiresIn: "1h" }
        );
        const { password: encryptedPass, ...rest } = newUser._doc;
        res
          .cookie("access_token", accessToken, {
            httpOnly: true,
            maxAge: 3600000,
          })
          .status(201)
          .json({ userData: rest });
      }
    } catch (error) {
      next(customError(res.status(500), error.message));
    }
  } else {
    next(customError(res.status(400), "All Inputs Are Essential"));
  }
};
const logInUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (email && password) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        next(customError(res.status(401), "User Is Unathorized"));
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          const accessToken = jwt.sign(
            {
              _id: user._id,
              email: user.email,
              role: user.role,
              phone: user.phone,
              username: user.username,
            },
            process.env.ACCESS_SECRET_TOKEN,
            { expiresIn: "1h" }
          );
          const { password: encryptedPass, ...rest } = user._doc;
          res
            .cookie("access_token", accessToken, {
              httpOnly: true,
              maxAge: 3600000,
            })
            .status(200)
            .json({ userData: rest });
        } else {
          next(customError(res.status(400), "Wrong Credentails"));
        }
      }
    } catch (error) {
      next(customError(res.status(500), error.message));
    }
  } else {
    next(customError(res.status(400), "All Inputs Are Essential"));
  }
};
const logOutUser = async (req, res, next) => {
  res.clearCookie("access_token").status(200).json("Logged Out Successfully");
};

export { registerUser, logInUser, logOutUser };
