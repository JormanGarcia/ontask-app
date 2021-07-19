import usersModel from "../models/users.model";
import { hashPassword } from "../commons/hashPassword";

type userName = { first: string; last: string };

type userType = {
  name: userName;
  email: string;
  password: string;
};

export const usersService = () => {
  const getUsers = async () => {
    try {
      const users = await usersModel.find();
      return users;
    } catch (err) {
      console.log(err);
    }
  };

  const getUserByID = async (_id: string) => {
    try {
      const user = await usersModel.findOne({ _id });
      return user;
    } catch (err) {
      console.log(err);
    }
  };

  const getUserByEmail = async (email: string) => {
    try {
      const user = await usersModel.findOne({ email });
      return user;
    } catch (err) {
      console.log(err);
    }
  };

  const createUser = async ({ name, email, password }: userType) => {
    const isEmailAvailable = usersModel.isEmailAvailable(email);

    try {
      const hashedPassword = await hashPassword(password);

      const newUser = await new usersModel({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      return newUser;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    getUsers,
    getUserByID,
    getUserByEmail,
    createUser,
  };
};
