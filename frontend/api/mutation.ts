import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation Signup(
    $first: String!
    $last: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      firstName: $first
      lastName: $last
      email: $email
      password: $password
    ) {
      password
      email
      _id
      name {
        first
        last
      }
    }
  }
`;

export const LOGIN = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      error
      msg
      user {
        _id
        name {
          first
          last
        }
      }
    }
  }
`;

export const ADD_NOTE = gql`
  mutation addNote($owner: String!, $group: String!) {
    addNote(owner: $owner, title: "untilted", group: $group) {
      content
      title
    }
  }
`;

export const UPDATE_NOTE_CONTENT = gql`
  mutation UpdateNoteContent($_id: String!, $content: String!) {
    updateNoteContent(_id: $_id, content: $content) {
      content
      _id
    }
  }
`;

export const UPDATE_NOTE_TITLE = gql`
  mutation UpdateNoteTitle($_id: String!, $title: String!) {
    updateNoteTitle(_id: $_id, title: $title) {
      title
      _id
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation UpdateNoteTitle($_id: String!) {
    deleteNote(_id: $_id) {
      title
      _id
    }
  }
`;
