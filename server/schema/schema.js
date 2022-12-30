const graphql = require("graphql");
const _ = require("lodash");

const events = require("events");
const { type } = require("os");

const emitter = new events.EventEmitter();
emitter.setMaxListeners(100);

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

var books = [
  { name: "Name of the Wind", genre: "Fanatsy", id: "1", authorId: "1" },
  { name: "Name of the Wind", genre: "Fanatsy", id: "2", authorId: "2" },
  { name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "3" },
  { name: "Ghosts", genre: "Horror", id: "4", authorId: "3" },
];

var authors = [
  { name: "Patrick Rothfuss", age: 44, id: "1" , bookId:"1"},
  { name: "Brandon Sanderson", age: 42, id: "2" ,bookId:"2"},
  { name: "Terry Pratchett", age: 66, id: "3" ,bookId:"3"},
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author:{
      type:AuthorType,
      resolve(parent , args){
        return _.find(authors,{id:parent.authorId})
      }
    }
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books : {
      type: new GraphQLList(BookType),
      resolve(parent ,args){
        return _.filter(books , {authorId:parent.id})
      }
    }
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      // RESOLVE FUNCTION FETCHS DATA FROM THE DATABASE AS PER THE QUERY
      resolve(parent, args) {
        // args.id?
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
