import express from 'express'
import {
    createAppointment,
    getAppointmentsByData,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
} from '../controlers/appointmentContoller.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/')
    .post(authMiddleware, createAppointment)
    .get(authMiddleware, getAppointmentsByData)

router.route('/:id')
    .get(authMiddleware, getAppointmentById)
    .put(authMiddleware, updateAppointment)
    .delete(authMiddleware, deleteAppointment)

export default router