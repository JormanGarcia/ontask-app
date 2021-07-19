import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  const salts = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salts);
  return hashedPassword;
};
