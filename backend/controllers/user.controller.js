import User from "../models/user.model.js";
import Book from "./../models/book.model.js";

import catchAsync from "./../utils/catch_async.js";

export const getAllMyBooks = catchAsync(async (req, res, next) => {
  const myBooks = await Book.find({}).where("author").equals(req.user._id);
  res.status(200).json({
    success: true,
    data: myBooks,
  });
});

export const getMe = (req, res, next) => {
  console.log({ user: req.user });
  req.params.id = req.user._id;
  next();
};

export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError("No user found. Please login again.", 401));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
