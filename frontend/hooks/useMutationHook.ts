import { useMutation } from "@apollo/client";
import { getQueryDefinition } from "@apollo/client/utilities";
import { useRouter } from "next/router";
import {
  ADD_NOTE,
  DELETE_NOTE,
  LOGIN,
  SIGNUP,
  UPDATE_NOTE_CONTENT,
  UPDATE_NOTE_TITLE,
} from "../api/mutation";
import { useUserContext } from "../context/UserContext";

export const useMutationHook = () => {
  const [dispatchSignup, signup] = useMutation(SIGNUP);
  const [dispatchLogin, login] = useMutation(LOGIN);
  const [dispatchNote, newNote] = useMutation(ADD_NOTE);
  const [dispatchNoteContent, updatedNoteContent] =
    useMutation(UPDATE_NOTE_CONTENT);

  const [dispatchNoteTitle, updatedNoteTitle] = useMutation(UPDATE_NOTE_TITLE);
  const [dispatchDeletedNote, deletedNote] = useMutation(DELETE_NOTE);

  const { query } = useRouter();

  const { dispatch } = useUserContext();
  const router = useRouter();

  const SignupUser = async (
    email: string,
    password: string,
    first: string,
    last: string
  ) => {
    const response = await dispatchSignup({
      variables: {
        first: first,
        email: email,
        password: password,
        last: last,
      },
    });

    dispatch({ type: "LOGIN_USER", payload: response.data.createUser });

    router.push("/notes/");
  };

  const LoginUser = async (email: string, password: string) => {
    const response = await dispatchLogin({
      variables: {
        email: email,
        password: password,
      },
    });

    console.log(response, "Login Data");

    if (response.data.login.error) {
      alert(response.data.login.msg);
      return;
    }

    dispatch({ type: "LOGIN_USER", payload: response.data.login.user });

    router.push("/notes/");
  };

  const AddNote = async (owner: string) => {
    const response = await dispatchNote({
      variables: {
        owner,
        group: query.group ? query.group : "",
      },
    });
  };

  const UpdateNoteContent = async (_id: string, content: string) => {
    const response = await dispatchNoteContent({
      variables: {
        _id,
        content,
      },
    });
  };

  const UpdateNoteTitle = async (_id: string, title: string) => {
    const response = await dispatchNoteTitle({
      variables: {
        _id,
        title,
      },
    });
  };

  const DeleteNote = async (_id: string) => {
    const response = await dispatchDeletedNote({
      variables: {
        _id,
      },
    });
  };

  return {
    SignupUser,
    LoginUser,
    AddNote,
    UpdateNoteContent,
    UpdateNoteTitle,
    DeleteNote,
  };
};
