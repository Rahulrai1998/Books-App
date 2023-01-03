const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
// const MONGO_URI = require('./')

const app = express();

mongoose.set("strictQuery", true);
mongoose.connect(
  "mongodb+srv://booksapp:Exasperate%4098@cluster0.h99cdtw.mongodb.net/booksapp?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});
// MOUNTING 'graphqlHTTP' middleware to '/graphql' PATH/ROUTE
app.use(
  "/graphql",
  graphqlHTTP.graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("listening on port 4000");
});
