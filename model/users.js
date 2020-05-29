let mongoose = require('mongoose');

//Create User Schema
let userSchema = mongoose.Schema({
 first_name: {
  type: String,
  require: true
 },
 last_name: {
  type: String,
  require: true
 },
 gender: {
  type: String,
  require: true
 },
 birthdate: {
  type: Date,
  default: Date.now
 },
 phone: {
  type: String,
  require: true
 },
 email: {
  type: String,
  require: true
 },
 roll_type: {
  type: String,
  require: true
 },
 password: {
  type: String,
  require: true
 },
 created_at: {
  type: Date,
  default: Date.now
 },
 updated_at: {
  type: Date,
  default: Date.now
 }
});

let User = module.exports = mongoose.model('User', userSchema);