import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'

dotenv.config()

const app = express()
app.use(morgan('tiny'))

const PORT = process.env.PORT || 8081

app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        message: 'app is running',
    })
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
