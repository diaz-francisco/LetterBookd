const User = require("./../models/userModel.js");
const catchAsync = require("./../utils/catchAsync");

exports.signup = catchAsync(
  async (req, res, _next) => {
    const newUser = await User.create(req.body);

    res.status(201).json({
      status: "Success",
      data: {
        user: newUser,
      },
    });
  }
);

module.exports;
