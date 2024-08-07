import express from 'express'
import signup from '../../controllers/signup/signup.controller.js'
import verify from '../../middlewares/tokenVerification.js';

const router = express.Router()

router.route('/').post( signup)

export default router
