import express from 'express'
import { createAppointment, getAppointmentsByData, getAppointmentById } from '../controlers/appointmentContoller.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/')
    .post(authMiddleware, createAppointment)
    .get(authMiddleware, getAppointmentsByData)

router.route('/:id')
    .get(authMiddleware, getAppointmentById)

export default router