// import mongoose from "mongoose";
const mongoose = require('mongoose')


// const Schema = mongoose.Schema;



const bookSchema = new mongoose.Schema({
  name: String,
  genre: String,
  authorId: String,
});

// mongoose.model("Book", bookSchema);
module.exports = mongoose.model('Book', bookSchema)
