import servicesRouter from './routes/servicesRoutes.js'
import dotenv from 'dotenv'
import colors from 'colors'
import { db } from './config/db.js'
import express from 'express'; //ESM

//Variables de entorno
dotenv.config()

// Configuracion la app
const app = express()

//Leer datos body
app.use(express.json())

//Conectar a la DB
db()

//Definir una ruta
app.use('/api/services', servicesRouter)

//Definir puerto
const PORT = process.env.PORT || 4000

//Arrancar la app
app.listen(PORT, () => {
    console.log(colors.blue(`El servidor se esta ejecutando en el puerto: ${PORT}`))
})