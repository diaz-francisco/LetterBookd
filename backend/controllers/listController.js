const List = require("../models/listModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllLists = catchAsync(async (req, res, next) => {
  const lists = await List.find();

  res.status(200).json({
    status: "Success",
    results: lists.length,
    data: {
      lists,
    },
  });
});

exports.getList = catchAsync(async (req, res, next) => {
  const list = await List.findById(req.params.id);

  if (!list) {
    return next(new AppError("List does not exist", 404));
  }

  res.status(200).json({
    status: "Success",
    data: {
      list,
    },
  });
});

exports.createList = catchAsync(async (req, res, _next) => {
  req.body.creator = req.user.id;

  const list = await List.create(req.body);

  res.status(201).json({
    status: "Success",
    data: {
      list,
    },
  });
});

exports.updateList = catchAsync(async (req, res, next) => {
  const list = await List.findById(req.params.id);

  if (!list) {
    return next(new AppError("No list found with that ID", 404));
  }

  if (list.creator.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new AppError("Not authorized", 403));
  }

  const updatedList = await List.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "Success",
    data: {
      updatedList,
    },
  });
});

exports.deleteList = catchAsync(async (req, res, next) => {
  const list = await List.findById(req.params.id);

  if (!list) {
    return next(new AppError("No list found with that ID", 404));
  }

  if (list.creator.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new AppError("Not authorized", 403));
  }

  await List.findByIdAndUpdate(req.params.id, {
    active: false,
    new: true,
  });

  res.status(204).json({
    status: "Success",
    data: null,
  });
});
