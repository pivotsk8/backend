import express from 'express'
import { register } from '../controlers/authController.js'

const router = express.Router()

// Rutas de autenticaccion y registro de usuarios
router.post('/register', register)


export default router