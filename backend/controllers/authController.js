const User = require("./../models/userModel.js");
const catchAsync = require("./../utils/catchAsync");
const jwt = require("jsonwebtoken");

const signToken = id => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

exports.signup = catchAsync(
  async (req, res, _next) => {
    const newUser = await User.create(req.body);

    const token = signToken(newUser._id);

    res.status(201).json({
      status: "Success",
      token,
      data: {
        user: newUser,
      },
    });
  }
);

exports.login = catchAsync(
  async (req, res, next) => {
    const { email, password } = req.body;
    //Check Exists
    if (!email || !password) {
      return next(
        new Error(
          "Please Provide email and password",
          400
        )
      );
    }
    //Check If correct
    const user = await User.findOne({
      email,
    }).select("+password");

    if (
      !user ||
      !(await user.correctPassword(
        password,
        user.password
      ))
    ) {
      return next(
        new Error(
          "Incorrect email or password",
          401
        )
      );
    }

    //Send Token
    const token = signToken(user._id);

    res.status(200).json({
      status: "Success",
      token,
    });
  }
);

exports.protect = catchAsync(
  async (req, res, next) => {
    //Get Token and Check

    //Verification

    //Check If Still Exists

    //Check if user changed password

    next();
  }
);

module.exports;
