// requires
var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

// POST login info from index.html
router.post('/',
    passport.authenticate('local', {
        // request stays within node/express and is routed as a new request
        successRedirect: '/user',
        failureRedirect: '/'
    })
);

// GET serves back index.html and catches any other request not explicitly matched elsewhere
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

module.exports = router;
