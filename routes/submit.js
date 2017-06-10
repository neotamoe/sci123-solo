// requires
var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var questionsModel = require('../models/questions.model');
var nodemailer = require('nodemailer');

// POST for student/user to submit new question to database
router.post('/', function(req, res) {
  // check if user is logged in & send back user object from database
  if(req.isAuthenticated() ) {
    // req.body is new question submitted by student/user
    var newQuestion = req.body;
    newQuestion.userId = req.user._id;
    newQuestion.userEmail = req.user.email;
    var addQuestion = questionsModel(newQuestion);
    // query to save question to database
    addQuestion.save(function(err, data){
      if (err) {
        console.log('Database Error: ', err);
        res.sendStatus(500);
      } else{
        res.sendStatus(200);
      }
    });
    // upon save success, send notification email to admin
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // secure:true for port 465, secure:false for port 587
        auth: {
            user: 'science123app@gmail.com',
            pass: 'Science123'
        }
    });
    // this is email to be sent to admin
        var mailOptions = {
        from: '"Science123 Quiz" <science123app@gmail.com>',
        to: '"Sci123App Admin" <science123app@gmail.com>',
        subject: 'Question added and ready for review',
        text: 'Hello!  ' + req.user.email + ' added a question to the Science123 Quiz App.  Please log in to the app to review it for approval, denial or editing.', // plain text body
        html: '<h2>Hello!</h2><p>'+req.user.email + ' added a question to the <strong>Science123 Quiz App.</strong>  Please log in to the app to review it for approval, denial or editing.</p>' // html body
    };
    // this sends email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
  } else {
    // redirect to /home if not logged in
    $location.path('/home');
    res.sendStatus(403);
  }
});
// PUT for student/user to flag a question in database
router.put('/:id', function(req, res) {
  var objectid=req.params.id;
  // check if user is logged in & send back user object from database
  if(req.isAuthenticated()) {
    // query to change display status of flagged question
    questionsModel.findOneAndUpdate({_id:objectid},{display:'false'}, function(err,data){
      if (err) {
        console.log('Database Error: ', err);
        res.sendStatus(500);
      } else {
        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // secure:true for port 465, secure:false for port 587
            auth: {
                user: 'science123app@gmail.com',
                pass: 'Science123'
            }
        });
        // this is email to be sent to admin
        var mailOptions = {
            from: '"Science123 Quiz" <science123app@gmail.com>',
            to: '"Sci123App Admin" <science123app@gmail.com>',
            subject: 'Question added and ready for review',
            text: 'Hello!  ' + req.user.email + ' flagged a question to the Science123 Quiz App.  Please log in to the app to review it for approval, denial or editing.', // plain text body
            html: '<h2>Hello!</h2><p>' + req.user.email + ' flagged a question to the <strong>Science123 Quiz App.</strong>  Please log in to the app to review it for approval, denial or editing.</p>' // html body
        };
        // this sends email
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
        res.sendStatus(200);
      }
    });
  } else {
    // redirect to /home if not logged in
    $location.path('/home');
    res.sendStatus(403);
  }
});

module.exports = router;
