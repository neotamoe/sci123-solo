var nodemailer = require('nodemailer');

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
    from: '"Science123 Quiz" <science123app@gmail.com>', // sender address
    to: 'neota.moe@gmail.com', // list of receivers
    subject: 'Question added and ready for review', // Subject line
    text: 'Hello!  Someone added a question to the Science123 Quiz App.  Please log in to the app to review it for approval, denial or editing.', // plain text body
    html: '<h2>Hello!</h2><p>Someone added a question to the <strong>Science123 Quiz App.</strong>  Please log in to the app to review it for approval, denial or editing.</p>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});

module.exports = nodemailer;
