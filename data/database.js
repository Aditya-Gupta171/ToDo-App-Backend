import mongoose from "mongoose";

export const connectdb = () => {
  mongoose
    .connect(process.env.MONGO_URI, { dbName: "backendapiprac" })
    .then(() => {
      console.log("db connected successfully");
    })
    .catch((e) => {
      console.log("error");
    });
};
