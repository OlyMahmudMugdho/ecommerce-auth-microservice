import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import signupRoute from './routes/signup/signup-route.js'
import loginRoute from './routes/login/login.route.js'
import cookieParser from 'cookie-parser'

dotenv.config()

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

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
