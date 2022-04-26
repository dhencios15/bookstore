import Book from "../models/book.model.js";

import ApiQuery from "../utils/api_query.js";
import catchAsync from "../utils/catch_async.js";

export const getAllBooks = catchAsync(async (req, res, next) => {
  const results = await ApiQuery(Book, req.query);
  res.status(200).json({
    success: true,
    ...results,
  });
});

export const createBook = catchAsync(async (req, res, next) => {
  const newBook = await Book.create({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
    author: req.user._id,
  });

  res.status(201).json({
    success: true,
    data: newBook,
  });
});
