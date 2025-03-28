const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");

exports.getAllUsers = catchAsync(
  async (req, res, _next) => {
    const users = await User.find(req.body);

    res.status(200).json({
      status: "Success",
      results: users.length,
      data: { data: users },
    });
  }
);

exports.getUser = catchAsync(
  async (req, res, _next) => {
    const user = await User.findById(
      req.params.id
    );

    res.status(200).json({
      status: "Success",
      data: { user },
    });
  }
);

exports.createUser = catchAsync(
  async (req, res, _next) => {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    res.status(201).json({
      status: "Success",
      data: {
        user: newUser,
      },
    });
  }
);

exports.updateUser = catchAsync(
  async (req, res, _next) => {
    const updatedUser =
      await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      status: "Success",
      data: {
        user: updatedUser,
      },
    });
  }
);

exports.deleteUser = catchAsync(
  async (req, res, _next) => {
    await User.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "Success",
      data: null,
    });
  }
);

exports.updateMe = catchAsync(
  async (req, res, next) => {
    a;
  }
);

module.exports;
