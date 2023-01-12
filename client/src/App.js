import AddBook from "./components/AddBook";
import BookList from "./components/BookList";


function App() {
  return (
    <div id="main">
      <h2>Book Store</h2>
      <BookList />
      <AddBook/>
    </div>
  );
}

export default App;
