import notesModel from "../models/notes.model";

type INewTask = {
  title: string;
  group: string;
  owner: string;
};

export const notesService = () => {
  const addNote = async ({ owner, title, group }: INewTask) => {
    try {
      const newNote = await new notesModel({
        title,
        group,
        owner,
      });

      await newNote.save();
      return newNote;
    } catch (err) {
      console.log(err);
    }
  };
  const getNotes = async (_id: string) => {
    try {
      const notes = await notesModel.find({ owner: _id });
      return notes;
    } catch (err) {
      console.log(err);
    }
  };

  const updateNoteContent = async (_id: string, content: string) => {
    try {
      const notes = await notesModel.updateOne(
        { _id },
        {
          content,
        }
      );
      return notes;
    } catch (err) {
      console.log(err);
    }
  };

  const updateNoteTitle = async (_id: string, title: string) => {
    try {
      const notes = await notesModel.updateOne(
        { _id },
        {
          title,
        }
      );
      return notes;
    } catch (err) {
      console.log(err);
    }
  };

  const deleteNote = async (_id: string) => {
    try {
      const notes = await notesModel.deleteOne({ _id });
      return notes;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    addNote,
    getNotes,
    updateNoteContent,
    updateNoteTitle,
    deleteNote,
  };
};
