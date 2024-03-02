const verify = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
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