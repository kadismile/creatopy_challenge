import {gql} from "@apollo/client/core";


export const GET_BOOKS = gql`
  query checkToken($accessToken: String!) {
      fetchBooks(accessToken: $accessToken) {
        title,
        description,
        userId
      }
  }
`

export const ADD_BOOK = gql`
  mutation createBook($title: String!, $description: String!, $accessToken: String!) {
      createBook(title: $title, description:$description, accessToken: $accessToken ) {
        accessToken,
        title,
        description,
    }
  }
`