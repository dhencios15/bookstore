import express from "express";

import { protect } from "../controllers/auth.controller.js";
import { createBook, getAllBooks } from "../controllers/book.controller.js";

const router = express.Router();

router.route("/").get(protect, getAllBooks).post(protect, createBook);
// router.route("/:slug").get(getProduct).put(updateProduct).delete(deleteProduct);

export default router;
