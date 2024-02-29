import { prisma } from "../../prisma/prisma.js";
import bcrypt from 'bcrypt';
import jsonwebtoken from "jsonwebtoken";

const jwt = jsonwebtoken;

const login = async (req, res) => {
    const { email, password } = req.body;


    if (!email || !password) {
        return res.status(204).json({
            ok: false,
            error: true,
            message: "email and password cannot be empty"
        })
    }

    const foundUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (!foundUser) {
        return res.status(404).json({
            ok: false,
            error: false,
            message: "user not found"
        })
    }


    const hasMatched = await bcrypt.compare(password, foundUser.password);

    if (!hasMatched) {
        return res.status(404).json({
            ok: false,
            error: false,
            message: "incorrect password"
        })
    }

    const accessToken = await jwt.sign(
        foundUser,
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: 60 * 60 * 6
        })

    res.cookie('accessToken', accessToken, { maxAge: 3 * 60 * 60, httpOnly: true })

    return res.status(200).json({
        ok: true,
        success: true,
        message: "successfully logged in",
        data: foundUser
    })

}

export default login;