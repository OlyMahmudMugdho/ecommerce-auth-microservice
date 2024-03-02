const jsonwebtoken = require("jsonwebtoken")
require("dotenv").config()

const verify = async (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1]
    // console.log(token);
    if (!token) {
        return res.status(401).json({
            ok: false,
            error: true,
            message: 'invalid token ',
        })
    }

    console.info(process.env.JWT_SECRET)

    const decoded = await jsonwebtoken.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            console.info(decoded);
            console.error(error)
            return res.status(401).json({
                ok: false,
                error: true,
                message: 'invalid token for auth service request',
            })
        }
        else {
            next()
        }
    });



}

module.exports= verify;