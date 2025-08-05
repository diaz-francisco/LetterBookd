const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, _next) => {
  const features = new APIFeatures(User.find(), req.query).filter().sort().limitFields().paginate();

  const users = await features.query;

  res.status(200).json({
    status: "Success",
    results: users.length,
    data: { data: users },
  });
});

exports.getUser = catchAsync(async (req, res, _next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    status: "Success",
    data: { user },
  });
});

exports.createUser = catchAsync(async (req, res, _next) => {
  const newUser = await User.create({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  res.status(201).json({
    status: "Success",
    data: {
      user: newUser,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  if (req.user.role !== "admin" && req.user.id !== req.param.id) {
    return next(new AppError("Not authorized", 403));
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "Success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deactivateMe = catchAsync(async (req, res, _next) => {
  await User.findByIdAndUpdate(req.user.id, {
    active: false,
  });

  res.status(204).json({
    status: "Success",
    data: null,
  });
});

exports.activateMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, {});
});

exports.updateMe = catchAsync(async (req, res, next) => {
  //Error if user POSTS password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError("This is not the intended route for password resseting, please use /updatePassword", 400));
  }
  //Filtered unwanted field names
  const filteredBody = filterObj(req.body, "name", "email");

  //Find User
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, { new: true, runValidators: true });

  //Update user data
  res.status(200).json({
    staus: "Success",
    data: { user: updatedUser },
  });
});

module.exports;
