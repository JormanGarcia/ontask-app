import dotenv from "dotenv";

dotenv.config();

export const env = {
  Port: process.env.PORT,
  MongoURI: process.env.MongoURI,
  Secret: process.env.SECRET,
};
