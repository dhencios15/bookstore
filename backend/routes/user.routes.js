import express from "express";

import {
  login,
  signup,
  logout,
  protect,
} from "../controllers/auth.controller.js";
import {
  getAllMyBooks,
  getMe,
  getUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

router.use(protect);

router.get("/my-books", getAllMyBooks);
router.get("/me", getMe, getUser);

export default router;
