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

export const getBook = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  const book = await Book.findOne({ slug });

  if (!book) return next(new AppError(`${slug} Book not Found`, 404));

  res.status(200).json({
    success: true,
    data: book,
  });
});

export const updateBook = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  const book = await Book.findOneAndUpdate({ slug }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!book) return next(new AppError(`${slug} Book not Found`, 404));

  res.status(201).json({
    success: true,
    data: book,
  });
});

export const deleteBook = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  const book = await Book.findOneAndDelete({ slug });

  if (!book) return next(new AppError(`${slug} Book not Found`, 404));

  res.status(200).json({
    success: true,
    message: "Book Deleted",
  });
});
