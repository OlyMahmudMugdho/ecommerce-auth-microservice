import express from "express";
import { checkAuthenticated } from "../../controllers/auth-check/checkAuthenitcated.js";

const router = express.Router();

router.route('/')
    .post(checkAuthenticated)

export default router;