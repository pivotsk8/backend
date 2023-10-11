import { createTransport } from "../config/nodemailer.js";

export async function sendEmailNewAppointment({ date, time }) {
    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS
    )

    //Enviar el email
    const info = await transporter.sendMail({
        from: 'AppSalon <citas@appsalon.com>',
        to: 'admin@appsalon.com',
        subject: 'AppSalon - Nueva Cita',
        text: 'AppSalon - Nueva Cita',
        html: `<p>Hola: Admin tienes una nueva cita</p>
        <p>La cita seré el día: ${date} a las ${time}horas </p>`
    })

    console.log('mensaje enviado', info.messageId)
}