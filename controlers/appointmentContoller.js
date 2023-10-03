import Appointment from '../models/Appointment.js'

const createAppointment = async (req, res) => {
    const appointment = req.body
    appointment.user = req.user._id.toString()
    console.log(appointment)

    try {
        const newAppointment = new Appointment(appointment)
        await newAppointment.save()
    } catch (error) {
        console.log('error')
    }
}
export { createAppointment };
