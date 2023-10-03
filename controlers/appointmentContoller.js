import { parse, formatISO, startOfDay, endOfDay, isValid } from 'date-fns'
import Appointment from '../models/Appointment.js'

const createAppointment = async (req, res) => {
    const appointment = req.body
    appointment.user = req.user._id.toString()
    try {
        const newAppointment = new Appointment(appointment)
        await newAppointment.save()
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
export { createAppointment, getAppointmentsByData };
