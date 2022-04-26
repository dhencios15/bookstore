import express from "express";

import {
  login,
  signup,
  logout,
  protect,
} from "../controllers/auth.controller.js";
import { getAllMyBooks } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

router.get("/my-books", protect, getAllMyBooks);

export default router;
