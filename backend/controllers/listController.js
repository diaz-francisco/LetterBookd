const catchAsync = require("../utils/catchAsync");
const List = require("../models/listModel");

exports.getLists = catchAsync(async (req, res, next) => {
  const lists = await List.find().populate({
    path: "user",
    select: "name photo",
  });
});
