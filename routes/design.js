import express from "express";
import {getDesigns, saveDesign} from "../controllers/design.js";
import auth from '../middleware/auth.js'

const router = express.Router();

router.get("/:id", getDesigns);
router.post("/", auth, saveDesign);

export default router;