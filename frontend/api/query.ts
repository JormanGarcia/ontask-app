import { gql } from "@apollo/client";

export const GET_NOTES = gql`
  query GetNotes($_id: String!) {
    getNotes(_id: $_id) {
      title
      content
      group
      _id
    }
  }
`;
