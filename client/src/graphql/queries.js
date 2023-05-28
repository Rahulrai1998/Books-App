import { gql } from "@apollo/client";

export const GET_ALL_BOOKS = gql`
  query getAllBooks {
    books {
      id
      name
      genre
      author {
        name
        age
        books {
          name
          genre
        }
      }
    }
  }
`;

export const GET_ALL_AUTHORS = gql`
  query getAllAuthors {
    authors {
      id
      name
      age
      books {
        name
        genre
      }
    }
  }
`;
export const GET_BOOK_QUERIES = gql`
  query getBookQueries($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

export const ADD_NEW_BOOK = gql`
  mutation ($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      genre
    }
  }
`;
