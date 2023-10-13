import express from 'express'
import { register, verifyAccount, login, user, forgotPassword } from '../controlers/authController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

// Rutas de autenticaccion y registro de usuarios
router.post('/register', register)
router.get('/verify/:token', verifyAccount)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)

//Area privada - requiere un JWT
router.get('/user', authMiddleware, user)


export default router