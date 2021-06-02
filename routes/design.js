import express from "express";
import { getDesigns, uploadDesign } from "../controllers/design.js";

const router = express.Router();

router.get("/", getDesigns);
router.post("/", uploadDesign);

export default router;