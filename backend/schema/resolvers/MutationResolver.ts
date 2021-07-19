import bcrypt from "bcrypt";

import { usersService } from "../../services/users.service";
import { notesService } from "../../services/notes.service";

const { getUserByID, getUsers, createUser, getUserByEmail } = usersService();
const { addNote, updateNoteContent, updateNoteTitle, deleteNote } =
  notesService();

export const Mutation = {
  createUser: async (_: any, { email, password, firstName, lastName }: any) => {
    return await createUser({
      name: {
        first: firstName,
        last: lastName,
      },
      email,
      password,
    });
  },

  addNote: async (_: any, { owner, title, group }: any) => {
    const newNote = await addNote({
      owner,
      title,
      group,
    });

    console.log(newNote);

    return newNote;
  },
  updateNoteContent: async (_: any, { _id, content }: any) => {
    const newNote = await updateNoteContent(_id, content);

    console.log(newNote);

    return newNote;
  },

  updateNoteTitle: async (_: any, { _id, title }: any) => {
    const newNote = await updateNoteTitle(_id, title);

    console.log(newNote);

    return newNote;
  },

  deleteNote: async (_: any, { _id }: any) => {
    const deletedNote = await deleteNote(_id);

    console.log(deletedNote);

    return deletedNote;
  },

  login: async (_: any, { email, password }: any) => {
    const user = await getUserByEmail(email);

    if (!user)
      return {
        error: true,
        msg: "Email doesn't exist",
        user: null,
      };

    const isPasswordTrue = await bcrypt.compare(password, user.password);

    if (!isPasswordTrue)
      return {
        error: true,
        msg: "Password is not correct",
        user: null,
      };

    return {
      error: false,
      msg: null,
      user,
    };
  },
};
