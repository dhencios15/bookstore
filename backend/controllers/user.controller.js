import Book from "./../models/book.model.js";

import catchAsync from "./../utils/catch_async.js";

export const getAllMyBooks = catchAsync(async (req, res, next) => {
  const myBooks = await Book.find({}).where("author").equals(req.user._id);
  res.status(200).json({
    success: true,
    data: myBooks,
  });
});
