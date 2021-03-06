// requires
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

// mongoose Schema for user collection in sci123Solo database
var UserSchema = new Schema({
    email: {type: String, required: true, index: {unique: true}},
    firstName: {type: String, required: true},
    password: {type: String, required: true},
    points:{type: Number, default: 0},
    admin: {type: Boolean, default: false}
});

// called before adding a new user to database (encrypts password).
UserSchema.pre('save', function(next) {
    var user = this;
    if(!user.isModified('password')) {
      return next();
    }
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if(err) {
          return next(err);
        }
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) {
              return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

// Used by login methods to compare login form password to database password
UserSchema.methods.comparePassword = function(candidatePassword, callback) {
    // 'this' here refers to this instance of the User model
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if(err) {
          return callback(err);
        }
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
