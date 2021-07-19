import { useLazyQuery, useQuery } from "@apollo/client";
import { createContext, FC, useContext, useEffect, useState } from "react";
import { GET_NOTES } from "../../api/query";
import { useNotesHook } from "../../hooks/useNotesHook";
import { ICard } from "../../models/card";
import { useUserContext } from "../UserContext";

type INotesContext = {
  notes: ICard[];
  setNotes: (a: ICard[]) => void;
  setNoteValue: (a: string, b: string) => void;
  filterByGroup: (a: ICard[], b: string) => ICard[];
  searchProps: any;
  refetch: any;
  setTitle: (a: string, b: string) => void;
};

export const NotesContext = createContext<INotesContext>({
  notes: [],
  setNotes: (a: ICard[]) => console.log(undefined),
  setNoteValue: (a: string, b: string) => console.log(undefined),
  filterByGroup: (a: ICard[], b: string) => a,
  searchProps: {},
  refetch: () => console.log(""),
  setTitle: (a: string, b: string) => console.log(a, b),
});

export const NotesContextProvider: FC = ({ children }) => {
  const [search, setSearch] = useState("");
  const { ...notes } = useNotesHook([], search);

  const {
    state: { user },
  } = useUserContext();

  const searchProps = {
    value: search,
    onChange: (e: any) => setSearch(e.target.value),
  };

  const [getNotes, { data, refetch }] = useLazyQuery(GET_NOTES, {
    variables: {
      _id: user?._id,
    },
  });

  useEffect(() => {
    (async () => {
      await getNotes();
      console.log(data);
    })();
  }, []);

  useEffect(() => {
    if (data) {
      notes.setNotes(data.getNotes);
    }
  }, [data]);

  return (
    <NotesContext.Provider value={{ ...notes, searchProps, refetch }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotesContext = () => useContext(NotesContext);
