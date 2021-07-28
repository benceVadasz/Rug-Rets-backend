import express from "express";
import { getShapes, uploadShape, deleteShape } from "../controllers/shape.js";
import auth from '../middleware/auth.js'

const router = express.Router();

router.get("/", getShapes);
router.post("/", auth, uploadShape);
router.post("/:id", auth, deleteShape);

export default router;