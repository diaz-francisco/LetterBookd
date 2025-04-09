const crypto = require("crypto");
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
  role: {
    type: String,
    enum: [
      "admin",
      "moderator",
      "member",
      "guest",
    ],
    default: "member",
  },
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
  dateCreated: {
    type: String,
    default: Date.now(),
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
  if (!this.isModified("password") || this.isNew)
    return next();

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

userSchema.methods.changedPassword = function (
  JWTTimeStamp
) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimeStamp < changedTimestamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken =
  function () {
    const resetToken = crypto
      .randomBytes(32)
      .toString("hex");

    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    console.log(
      { resetToken },
      this.passwordResetToken
    );

    this.passwordResetExpires =
      Date.now() + 10 * 60 * 1000;

    return resetToken;
  };

const User = new mongoose.model(
  "User",
  userSchema
);

module.exports = User;
