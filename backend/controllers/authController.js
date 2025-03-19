const User = require("./../models/userModel.js");
const catchAsync = require("./../utils/catchAsync");
const jwt = require("jsonwebtoken");

exports.signup = catchAsync(
  async (req, res, _next) => {
    const newUser = await User.create(req.body);

    const token = jwt.sign(
      { id: newUser._id },
      "secret"
    );

    res.status(201).json({
      status: "Success",
      data: {
        user: newUser,
      },
    });
  }
);

module.exports;
