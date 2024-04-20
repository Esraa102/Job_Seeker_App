import mongoose from "mongoose";

export const connectToDB = async () => {
  mongoose
    .connect(process.env.MONGODB_CONNECTION_URI)
    .then(() => {
      console.log("Connected");
    })
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
};
