import express from "express";
import { getColors, uploadColor, deleteColor } from "../controllers/color.js";
import auth from '../middleware/auth.js'

const router = express.Router();

router.get("/:id", getColors);
router.post("/", auth, uploadColor);
router.delete("/:id", auth, deleteColor);

export default router;