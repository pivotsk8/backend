import express from 'express'
import { createAppointment, getAppointmentsByData } from '../controlers/appointmentContoller.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/')
    .post(authMiddleware, createAppointment)
    .get(authMiddleware, getAppointmentsByData)

export default router