import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_AUTHORS } from "../graphql/queries";

export default function AddBook() {
  const { data, error, loading } = useQuery(GET_ALL_AUTHORS, {
    fetchPolicy: "cache-and-network",
  });
  //   console.log(data);

  return (
    <div>
      <form action="" id="add_book">
        <div className="filed">
          <label>Book Name : </label>
          <input type="text" />
        </div>
        <div className="filed">
          <label>Genre : </label>
          <input type="text" />
        </div>
        <div className="filed">
          <label>Author : </label>
          <select>
            {data.authors.map((item) => {
              return 
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              
            })}
          </select>
        </div>

        <button>+</button>
      </form>
    </div>
  );
}
