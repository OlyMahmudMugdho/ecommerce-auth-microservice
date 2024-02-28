import { Router } from "express";
import { signup } from '../../controllers/signup/signupController'
const router = Router();

router.route('/')
    .post(signup)

    module.exports = router