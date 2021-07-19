import bcrypt from "bcrypt";

import { notesService } from "../../services/notes.service";
import { usersService } from "../../services/users.service";

const { getUserByID, getUsers, getUserByEmail } = usersService();
const { getNotes } = notesService();

export const Query = {
  getUser: async (_: any, args: any) => {
    const user = await getUserByID(args._id);
    return user;
  },

  getNotes: async (_: any, args: any) => getNotes(args._id),
};
