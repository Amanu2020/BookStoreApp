const mongoose = require('mongoose');

//Create Schema
let bookSchema = mongoose.Schema({
 isbn: {
  type: String,
  require: true
 },
 title: {
  type: String,
  require: true
 },
 subtitle: {
  type: String,
  require: true
 },
 author: {
  type: String,
  require: true
 },
 published: {
  type: String,
  require: true
 },
 publisher: {
  type: String,
  require: true
 },
 edition: {
  type: String,
  require: true
 },
 price: {
  type: Number,
  require: true
 },
 pages: {
  type: Number,
  require: true
 },
 format: {
  type: String,
  require: true
 },
 description: {
  type: String,
  require: true
 },
 suger: {
  type: Number,
  require: true
 },
 image: {
  type: String,
  require: true
 },
 website: {
  type: Number,
  require: true
 }
});

let Book = module.exports = mongoose.model('Book', bookSchema);