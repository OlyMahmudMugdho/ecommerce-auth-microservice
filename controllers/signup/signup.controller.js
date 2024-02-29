import { prisma } from '../../prisma/prisma.js'
import bcrypt from 'bcrypt'

const signup = async (req, res) => {
    const { name, email, password, phone } = req.body

    if (!name || !email || !password) {
        return res.status(204).json({
            ok: false,
            error: true,
            message: 'empty request body',
            description: 'name, email and password are required',
        })
    }

    const isExistedUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
    })

    if (isExistedUser) {
        return res.status(409).json({
            ok: false,
            error: true,
            message: 'user already existed with this email',
        })
    }

    try {
        if (phone === null) {
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: await bcrypt.hash(password, 10),
                },
            })

            return res.status(200).json({
                success: true,
                message: 'user created successfully',
                user: user,
            })
        } else {
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: await bcrypt.hash(password, 10),
                    phone,
                },
            })

            return res.status(200).json({
                success: true,
                message: 'user created successfully',
                user: user,
            })
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error: true,
            message: 'internal server error',
        })
    }
}

export default signup
