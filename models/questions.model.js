// requires
var mongoose = require ('mongoose');
var Schema = mongoose.Schema;
var User = require ('./user.model');

// schema
var QuestionSchema = new Schema({
  userId:{type: Schema.Types.ObjectId, ref: 'User', required: true},
  userEmail: {type: Schema.Types.String, ref:'User', required: true},
  dateCreated: {type: Date, default: Date.now},
  chapter: Number,
  source: String,
  page: Number,
  question: String,
  a: String,
  b: String,
  c: String,
  d: String,
  answer: String,
  tags: Array,
  display: {type:String, required:true, default: 'false'}
});

// model
var questions = mongoose.model ('questions', QuestionSchema);

module.exports = questions;
