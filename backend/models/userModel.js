const crypto = require("crypto");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const validator = require("validator");
const { validate } = require("./reviewModel");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
    trim: true,
  },
  username: {
    type: String,
    required: [true, "Please enter a username"],
    minlength: [3, "Username must be at least 3 characters long"],
    maxlength: [30, "Username cannot exceed 30 characters"],
    match: [/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and hyphens"],
    lowercase: true,
    unique: [true, "That username is taken"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    maxLength: [254, "Password too long"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: String,
  role: {
    type: String,
    enum: ["admin", "moderator", "member", "guest"],
    default: "member",
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    minlength: [8, "Password must be at least 8 characters long"],
    maxLength: [128, "Password too long"],
    select: false,
    validate: {
      validator: function (password) {
        if (!/[A-Z]/.test(password)) return false;

        if (!/[a-z]/.test(password)) return false;

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;

        return true;
      },
      message: "Password must contain at least one uppercase letter, one lowercase letter and one special character",
    },
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please provide a password!"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.pre("save", async function (next) {
  //Only runs if password is modified
  if (!this.isModified("password")) return next();

  //Hash with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //Delete passwordConfirmed field
  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.correctPassword = async function (canidatePassword, userPassword) {
  return await bcrypt.compare(canidatePassword, userPassword);
};

userSchema.methods.changedPassword = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

    return JWTTimeStamp < changedTimestamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = new mongoose.model("User", userSchema);

module.exports = User;
