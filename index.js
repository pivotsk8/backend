import servicesRouter from './routes/servicesRoutes.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import appointmentRoutes from './routes/appointmentRoutes.js'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import { db } from './config/db.js'
import express from 'express'; //ESM

//Variables de entorno
dotenv.config()

// Configuracion la app
const app = express()


//Conectar a la DB
db()

//configurar CORS
const whiteList = [process.env.FRONTEND_URL]

process.argv[2] === '--postman' ? whiteList.push(undefined) : whiteList

const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'))
        }
    }
}
app.use(cors(corsOptions))

//Leer datos body
app.use(express.json())

//Definir una ruta
app.use('/api/services', servicesRouter)
app.use('/api/auth', authRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/users', userRoutes)

//Definir puerto
const PORT = process.env.PORT || 4000

//Arrancar la app
app.listen(PORT, () => {
    console.log(colors.blue(`El servidor se esta ejecutando en el puerto: ${PORT}`))
})