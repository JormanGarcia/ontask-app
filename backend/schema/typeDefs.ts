import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type UserNameType {
    first: String
    last: String
  }

  type Notes {
    content: String
    title: String
    group: String
    _id: String
    owner: String
  }

  type User {
    _id: String
    name: UserNameType
    password: String
    email: String
  }

  type LoginResponse {
    error: Boolean
    user: User
    msg: String
  }

  # Resolvers

  type Query {
    getUser(_id: String!): User
    getNotes(_id: String): [Notes]
  }

  type Mutation {
    createUser(
      email: String!
      password: String!
      firstName: String!
      lastName: String!
    ): User
    addNote(owner: String!, title: String!, group: String): Notes
    login(email: String!, password: String!): LoginResponse
    updateNoteContent(content: String!, _id: String!): Notes
    updateNoteTitle(title: String!, _id: String!): Notes
    deleteNote(_id: String!): Notes
  }
`;
