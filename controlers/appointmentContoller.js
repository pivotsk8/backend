import { parse, formatISO, startOfDay, endOfDay, isValid } from 'date-fns'
import Appointment from '../models/Appointment.js'
import { validateObjectId, handleNotFoundError, formatDate } from '../utils/index.js'
import { sendEmailNewAppointment, sendEmailUpdateAppointment } from '../emails/appointmentsEmailServices.js'


const createAppointment = async (req, res) => {
    const appointment = req.body
    appointment.user = req.user._id.toString()
    try {
        const newAppointment = new Appointment(appointment)
        const result = await newAppointment.save()

        await sendEmailNewAppointment({
            date: formatDate(result.date),
            time: result.time
        })

        res.json({
            msg: 'Tu Reserrvación se ralizó correctamente'
        })
    } catch (error) {
        console.log('error')
    }
}

const getAppointmentsByData = async (req, res) => {
    const { date } = req.query

    const newDate = parse(date, 'dd/MM/yyyy', new Date())

    const error = new Error('fecha no valida')
    !isValid(newDate) ? res.status(400).json({ msg: error.message }) : null

    const isoDate = formatISO(newDate)
    const appointments = await Appointment.find({
        date: {
            $gte: startOfDay(new Date(isoDate)),
            $lte: endOfDay(new Date(isoDate))
        }
    }).select('time')

    res.json(appointments)
}

const getAppointmentById = async (req, res) => {
    const { id } = req.params

    //validar por object id
    if (validateObjectId(id, res)) return

    //Validar que exista
    const appointment = await Appointment.findById(id).populate('services')
    if (!appointment) {
        return handleNotFoundError('La Cita no existe ', res)
    }

    if (appointment.user.toString() !== req.user._id.toString()) {
        const error = new Error('No tiene los permisos')
        return res.status(403).json({ meg: error.message })
    }
    res.json(appointment)

}

const updateAppointment = async (req, res) => {
    const { id } = req.params

    //validar por object id
    if (validateObjectId(id, res)) return

    //Validar que exista
    const appointment = await Appointment.findById(id).populate('services')
    if (!appointment) {
        return handleNotFoundError('La Cita no existe ', res)
    }

    if (appointment.user.toString() !== req.user._id.toString()) {
        const error = new Error('No tiene los permisos')
        return res.status(403).json({ meg: error.message })
    }

    const { date, time, totalAmount, services } = req.body
    appointment.date = date
    appointment.time = time
    appointment.totalAmount = totalAmount
    appointment.services = services

    try {
        const result = await appointment.save()
        await sendEmailUpdateAppointment({
            date: formatDate(result.date),
            time: result.time
        })

        res.json({
            msg: 'Cita Actualizada Correctamente'
        })

    } catch (error) {
        console.log(error)
    }
}

const deleteAppointment = async (req, res) => {
    const { id } = req.params

    //validar por object id
    if (validateObjectId(id, res)) return

    //Validar que exista
    const appointment = await Appointment.findById(id).populate('services')
    if (!appointment) {
        return handleNotFoundError('La Cita no existe ', res)
    }

    if (appointment.user.toString() !== req.user._id.toString()) {
        const error = new Error('No tiene los permisos')
        return res.status(403).json({ meg: error.message })
    }

    try {
        await appointment.deleteOne()

        res.json({ msg: 'Citas Cancelada Exitosamente' })
    } catch (error) {
        console.log(error)
    }
}

export {
    createAppointment,
    getAppointmentsByData,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
};
