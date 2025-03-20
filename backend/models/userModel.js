const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [
      validator.isEmail,
      "Please provide a valid email",
    ],
  },
  photo: String,
  password: {
    type: String,
    required: [
      true,
      "Please provide a password!",
    ],
    minlength: [
      8,
      "Password must be atleas 8 characters long",
    ],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [
      true,
      "Please provide a password!",
    ],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
    },
  },
});

userSchema.pre("save", async function (next) {
  //Only runs if password is modified
  if (!this.isModified("password")) return next();

  //Hash with cost of 12
  this.password = await bcrypt.hash(
    this.password,
    12
  );

  //Delete passwordConfirmed field
  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.correctPassword =
  async function (
    canidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(
      canidatePassword,
      userPassword
    );
  };

const User = new mongoose.model(
  "User",
  userSchema
);

module.exports = User;
