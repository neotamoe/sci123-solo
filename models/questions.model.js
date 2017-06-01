// requires
var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

// schema
var QuestionSchema = new Schema({
  chapter: Number,
  source: String,
  page: Number,
  question: String,
  a: String,
  b: String,
  c: String,
  d: String,
  answer: String,
  tags: String,
  display: Boolean,
});

// model
var questions = mongoose.model ('questions', QuestionSchema);

module.exports = questions;
