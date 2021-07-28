import express from "express";
const router = express.Router();
import { signIn, signUp, updateProfile, validateCredentials } from "../controllers/user.js";
import auth from '../middleware/auth.js'

router.post('/signIn', signIn);
router.post('/signUp', signUp);
router.put('/:id', auth, updateProfile);
router.post('/check', validateCredentials);

export default router;