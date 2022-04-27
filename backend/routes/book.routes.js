import express from "express";

import { protect } from "../controllers/auth.controller.js";
import {
  createBook,
  getAllBooks,
  updateBook,
  getBook,
  deleteBook,
} from "../controllers/book.controller.js";

const router = express.Router();

router.route("/").get(protect, getAllBooks).post(protect, createBook);
router.route("/:slug").get(getBook).put(updateBook).delete(deleteBook);

export default router;
