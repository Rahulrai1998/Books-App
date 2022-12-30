const express = require("express");
const graphqlHTTP = require("express-graphql");

const app = express();

const schema = require("./schema/schema");

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
