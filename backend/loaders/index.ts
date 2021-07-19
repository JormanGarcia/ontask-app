import mongoose from "mongoose";
import { env } from "../config";

export const initMongoDB = () => {
  console.log("Connecting Database...");

  try {
    mongoose.connect(
      env.MongoURI!,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err) => {
        if (err) throw err;
        console.log("Database Connected");
      }
    );
  } catch (err) {
    console.log(err);
  }
};
