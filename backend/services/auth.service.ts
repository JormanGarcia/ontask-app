import { error } from "../commons/errorHandling";
import usersModel from "../models/users.model";
import bcrypt from "bcrypt";

export const authServices = () => {
  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const users = await usersModel.find({ email });

    if (users.length === 0) return error.invalidEmail;

    const user = users[0];

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) return error.incorrectPassword;

    return user;
  };

  return {
    login,
  };
};
