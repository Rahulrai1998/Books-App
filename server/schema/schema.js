const graphql = require("graphql");
const _ = require("lodash");

const events = require("events");
const { type } = require("os");

const mongoose = require("mongoose");

const Book = require("../models/book");
const Author = require("../models/author");

const emitter = new events.EventEmitter();
emitter.setMaxListeners(100);

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

// var books = [
//   { name: "Name of the Wind", genre: "Fanatsy", id: "1", authorId: "1" },
//   { name: "Name of the Wind", genre: "Fanatsy", id: "2", authorId: "2" },
//   { name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "3" },
//   { name: "Ghosts", genre: "Horror", id: "4", authorId: "3" },
// ];

// var authors = [
//   { name: "Patrick Rothfuss", age: 44, id: "1", bookId: "1" },
//   { name: "Brandon Sanderson", age: 42, id: "2", bookId: "2" },
//   { name: "Terry Pratchett", age: 66, id: "3", bookId: "3" },
// ];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return Author.findById(parent.authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({ authorId: parent.id });
      },
    },
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
        return Book.findById(args.id);

        // args.id?
        // return _.find(books, { id: args.id });
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({});
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.findById(args.id);
        // return _.find(authors, { id: args.id });
      },
    },

    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({});
        // return authors;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });

        return author.save(); // mongoose returns the saved object
      },
    },

    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });

        return book.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
