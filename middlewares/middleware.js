const verify = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({
                ok: false,
                error: true,
                message: 'invalid token for auth service request',
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(401).json({
                ok: false,
                error: true,
                message: 'invalid token for auth service request',
            })
        }
        req.source = decoded.source;
        next()
    } catch (error) {
        return res.status(401).json({
            ok: false,
            error: true,
            message: 'invalid token for auth service request',
        })
    }
}

export default verify;