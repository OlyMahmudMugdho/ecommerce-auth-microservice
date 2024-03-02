import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import signupRoute from './routes/signup/signup.route.js'
import loginRoute from './routes/login/login.route.js'
import {prisma} from './prisma/prisma.js'
import generate from './utils/jwt.generator.js'

dotenv.config()

console.log(process.env.JWT_SECRET)

const app = express()
app.use(morgan('tiny'))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
const PORT = process.env.PORT || 8081

app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        message: 'app is running',
    })
})

app.use('/signup', signupRoute)
app.use('/login', loginRoute)

app.listen(PORT, async () => {
    try {
        await prisma.$connect();
        console.info("database connected");
        await generate();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error.message);
    }
})
