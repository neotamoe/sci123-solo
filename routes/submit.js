var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var questionsModel = require('../models/questions.model');
var nodemailer = require('nodemailer');

router.post('/', function(req, res) {
  console.log(' in post route to studentSubmit a question: req.body-->', req.body);
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('still logged in');
    // var addQuestion = req.body;
    // addQuestion.userId = req.user._id;
    var newQuestion = req.body;
    newQuestion.userId = req.user._id;
    newQuestion.userEmail = req.user.email;
    var addQuestion = questionsModel(newQuestion);
    addQuestion.save().then(function(data){
      res.sendStatus(200);
    });

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

    // setup email data with unicode symbols
    var mailOptions = {
        from: '"Science123 Quiz" <science123app@gmail.com>',
        to: '"Sci123App Admin" <science123app@gmail.com>',
        subject: 'Question added and ready for review',
        text: 'Hello!  ' + req.user.email + ' added a question to the Science123 Quiz App.  Please log in to the app to review it for approval, denial or editing.', // plain text body
        html: '<h2>Hello!</h2><p>'+req.user.email + ' added a question to the <strong>Science123 Quiz App.</strong>  Please log in to the app to review it for approval, denial or editing.</p>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    $location.path("/home");
    res.sendStatus(403);
  }
});

router.put('/:id', function(req, res) {
  console.log(' in put route to flag questions: req.params.id-->', req.params.id);
  var objectid=req.params.id;
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('still logged in');
    questionsModel.findOneAndUpdate({_id:objectid},{display:'false'}).then(function(){
      res.sendStatus(200);
    });
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    $location.path("/home");
    res.sendStatus(403);
  }
});


module.exports = router;
