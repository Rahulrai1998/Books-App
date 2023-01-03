// import mongoose from "mongoose";
const mongoose = require('mongoose')


const authorSchema = new mongoose.Schema({
    name: String,
    age: Number,
    bookId: String,
  });
  
  // mongoose.model("Author" , authorSchema)
  module.exports = mongoose.model('Author', authorSchema)
