import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_AUTHORS, ADD_NEW_BOOK } from "../graphql/queries";

export default function AddBook() {
  const [formData, setFormData] = useState({
    bookName: "",
    genre: "",
    authorId: "63b3d265b718924d942e7030",
  });

  const [addBook , {a,b,c} ] = useMutation(ADD_NEW_BOOK);
  const { data, error, loading } = useQuery(GET_ALL_AUTHORS, {
    fetchPolicy: "cache-and-network",
  });
  if (loading) {
    return <h2>Loading....</h2>;
    
  }
  if (error) {
    console.log(error)
    return <h2>Something went wrong..</h2>;
  }
  console.log(data);

  const submitForm = (e) => {
    e.preventDefault();
    console.log(formData);
    addBook({
      variables: {
        name: formData.bookName,
        genre: formData.genre,
        authorId: formData.authorId,
      },
      refetchQueries:['getAllBooks']
    });
  };

  return (
    <div>
      <form action="" id="add_book" onSubmit={submitForm}>
        <div className="field">
          <label>Book Name : </label>
          <input
            type="text"
            onChange={(e) =>
              setFormData({ ...formData, bookName: e.target.value })
            }
          />
        </div>
        <div className="field">
          <label>Genre : </label>
          <input
            type="text"
            onChange={(e) =>
              setFormData({ ...formData, genre: e.target.value })
            }
          />
        </div>
        <div className="field">
          <label>Author : </label>
          <select
            onChange={(e) =>
              setFormData({ ...formData, authorId: e.target.value })
            }
          >
            {data.authors.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>

        <button>+</button>
      </form>
    </div>
  );
}
