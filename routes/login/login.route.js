import express from 'express'
import loginController from '../../controllers/login/login.controller.js'
import verify from '../../middlewares/tokenVerification.js';

const router = express.Router()

router.route('/').post(verify, loginController)

export default router
