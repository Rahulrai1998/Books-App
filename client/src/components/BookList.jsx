import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import { GET_ALL_BOOKS } from "../graphql/queries";
import BookDetails from "./BookDetails";

export default function BookList() {
  const { loading, error, data } = useQuery(GET_ALL_BOOKS, {
    fetchPolicy: "cache-and-network",
  });

  const [selectedBook, setSelectedBook] = useState("");
  // console.log(selectedBook)
  if (loading) {
    return <h2>Loading....</h2>;
  }
  if (error) {
    console.log(error);
    return <h2>Something went wrong..</h2>;
  }

    // console.log(data);

  return (
    <div>
      <ul id="book-list">
        {data.books.map((item) => {
          return (
            <li key={item.id} onClick={()=> setSelectedBook(item.id)}>
              {item.name}
            </li>
          );
        })}
      </ul>
      <BookDetails bookId={selectedBook} />
    </div>
  );
}
