import { createTransport } from '../config/nodemailer.js'

export async function sendEmailVerification({ name, email, token }) {
    const transporter = createTransport(
        "sandbox.smtp.mailtrap.io",
        2525,
        "51cf12e4496159",
        "4b5c155a6c56b3"
    )

    //Enviar el email
    const info = await transporter.sendMail({
        from: 'AppSalon',
        to: 'correo@.correo.com',
        subject: 'AppSalon -Confirma tu cuenta',
        text: 'AppSalon - Confirma tu cuenta',
        html: `<p>Hola: ${name}, confirma tu cuenta en AppSalon</p>
        <p>Tu cuenta esta casi lista, solo debes confirmarla en el siguiente enlace</p>
        <a href="http://localhost:4000/api/auth/verify/${token}">Confirmar cuenta</a>
        <p>Si tu no create esta cuenta, puedes ignorar este mensaje</p>`
    })

    console.log('mensjae enviado', info.messageId)
}

