import { useQuery } from "@apollo/client";
import React from "react";
import { GET_BOOK_QUERIES } from "../graphql/queries";

export default function BookDetails({ bookId }) {
  const { data, loading, error } = useQuery(GET_BOOK_QUERIES, {
    variables: {
      id: bookId,
    },
    fetchPolicy: "cache-and-network",
  });

  console.log();
  return (
    <div id="book-details">
      {data ? (
        <>
          <h1>{data?.book?.name}</h1>
          <p>{data?.book?.genre}</p>
          <p>{data?.book?.author?.name}</p>
          <p></p>
          <ul className="other-books">
            {data?.book?.author?.books?.map((item) => {
              return <li key={item?.id}>{item?.name}</li>;
            })}
          </ul>
        </>
      ) : (
        <h4>No Book Selected</h4>
      )}
    </div>
  );
}
