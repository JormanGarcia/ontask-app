import { ICard } from "../models/card";
import { useState } from "react";
import { useMutationHook } from "./useMutationHook";

export const useNotesHook = (state: ICard[], search: string = "") => {
  const [notes, setNotes] = useState(state);
  const { UpdateNoteContent, UpdateNoteTitle } = useMutationHook();

  const filteredNotes = (toFilterNotes: ICard[], toSearch: string) => {
    if (toFilterNotes.length === 0) return [];
    return toFilterNotes.filter(
      ({ title, content }) =>
        content.includes(toSearch) || title.includes(toSearch)
    );
  };

  const setTitle = async (_id: string, title: string) => {
    setNotes(
      notes.map((card) => {
        if (card._id === _id) {
          return {
            ...card,
            title,
          };
        }
        return card;
      })
    );

    await UpdateNoteTitle(_id, title);
  };

  const filterByGroup = (notes: ICard[], group: string) => {
    if (notes.length === 0) return [];

    return notes.filter((note) => note.group === group);
  };

  const setNoteValue = async (content: string, _id: string) => {
    setNotes(
      notes.map((card) => {
        if (card._id === _id) {
          return {
            ...card,
            content,
          };
        }
        return card;
      })
    );

    await UpdateNoteContent(_id, content);
  };

  return {
    notes: filteredNotes(notes, search),
    setNoteValue,
    setNotes,
    filterByGroup,
    setTitle,
  };
};
