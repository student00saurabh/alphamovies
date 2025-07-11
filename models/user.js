const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
  limitAttempts: true,
  maxAttempts: 3,
  interval: 100, // in ms between failed attempts
  maxInterval: 300000, // max wait time after many failures
  unlockInterval: 60000, // optional: auto unlock after 1 minute
  errorMessages: {
    MissingPasswordError: "No password was given",
    AttemptTooSoonError: "Account is currently locked. Try again later",
    TooManyAttemptsError:
      "Too many unsuccessful login attempts. Your account has been temporarily locked for security reasons. Please try again in 5 minutes.",
    NoSaltValueStoredError: "Authentication not possible. No salt value stored",
    IncorrectPasswordError: "Password or email ID is incorrect",
    IncorrectUsernameError: "Password or email ID is incorrect",
    MissingUsernameError: "No email was provided",
    UserExistsError:
      "This email is already registered. Try logging in instead!",
  },
});
module.exports = mongoose.model("User", userSchema);
