import { useQuery } from "@apollo/client";
import React from "react";
import { GET_ALL_BOOKS } from "../graphql/queries";

export default function BookList() {
  const { loading, error, data } = useQuery(GET_ALL_BOOKS, {
    fetchPolicy: "cache-and-network",
  });

  if(loading) {
    return <h2>Loading....</h2>
  }
  if(error){
    console.log(error)
    return <h2>Something went wrong..</h2>
  }

//   console.log(data);
  return (
    <div>
      <ul id="book-list">
        {data.books.map((item) => {
          return <li key={item.id}>{item.name}</li>;
        })} 
      </ul>
    </div>
  );
}
