import express from "express";
import signup from '../../controllers/signup/signupController.js'

const router = express.Router();

router.route('/')
    .post(signup)

export default router;