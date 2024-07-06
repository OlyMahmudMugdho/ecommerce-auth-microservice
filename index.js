import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import signupRoute from './routes/signup/signup.route.js'
import loginRoute from './routes/login/login.route.js'
import { prisma } from './prisma/prisma.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import cors from 'cors'

//import generate from './utils/jwt.generator.js'

dotenv.config()

console.log(process.env.JWT_SECRET)

const app = express()

app.use(cookieParser());

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));


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


/*
    * @author : M. Oly Mahmud
    * this section is for sending html and static files,,, 

    const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
    const __dirname = path.dirname(__filename);

    app.use(express.static(__dirname + "/out"))

    app.get('/*', function (req, res) {
        res.sendFile(path.resolve('./out/index.html'));
    });

 */
app.use('/api/signup', signupRoute)
app.use('/api/login', loginRoute)

app.listen(PORT, async () => {
    try {
        await prisma.$connect();
        console.info("database connected");
        //await generate();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error.message);
    }
})
