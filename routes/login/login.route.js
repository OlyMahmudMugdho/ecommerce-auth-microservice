import express from "express";
import loginController from '../../controllers/login/login.controller.js'

const router = express.Router();

router.route('/')
.post(loginController)

export default router;