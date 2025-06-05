const List = require("../models/listModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllLists = catchAsync(async (req, res, next) => {
  const lists = await List.find().populate({ path: "user", select: "name photo" });

  res.status(200).json({
    status: "Success",
    results: lists.length,
    data: {
      lists,
    },
  });
});

exports.createList = catchAsync(async (req, res, next) => {});

module.exports;
