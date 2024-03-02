import jsonwebtoken from "jsonwebtoken"

const verify = async (req, res, next) => {

    const header = req.headers['authorization']

    if (!header) {
        return res.status(401).json({
            ok: false,
            error: true,
            message: 'no authorization header found',
        })
    }
    
    const token = header.split(' ')[1]

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

export default verify;