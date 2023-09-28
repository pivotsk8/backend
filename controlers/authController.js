import User from '../models/User.js'
import { sendEmailVerification } from '../emails/authEmailService.js'
import { generateJWT } from '../utils/index.js'

const register = async (req, res) => {
    const error = new Error('Todos los campos son obligatorios')

    //Valida campos
    if (Object.values(req.body).includes('')) {
        return res.status(400).json({ msg: error.message })
    }

    const { email, password, name } = req.body

    //Evitar registros duplicados
    const userExists = await User.findOne({ email })
    if (userExists) {
        return res.status(400).json({ msg: error.message = 'Usuario ya resgistrado' })
    }

    //Validar la extension del password   
    if (password.trim().length < 8) {
        return res.status(400).json({ msg: error.message = 'La contraseña debe tener 8 o mas caracteres' })
    }

    try {
        const user = new User(req.body)
        const result = await user.save()

        const { name, email, token } = result
        sendEmailVerification({ name, email, token })

        res.json({
            msg: 'El usuario se creo correctamente'
        })
    } catch (error) {
        console.log(error)
    }

}

const verifyAccount = async (req, res) => {
    const { token } = req.params

    const error = new Error('hubo un error, token no valido')
    const user = await User.findOne({ token })
    if (!user) {
        return res.status(401).json({ msg: error.message })
    }

    // Si el token es valido, confirmar la cuenta
    try {
        user.verified = true
        user.token = ''
        await user.save()
        res.json({ msg: 'Usuraio Confirmado Correctamente' })
    } catch (error) {
        console.log(error)
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    //verificar que el usuario existe
    const error = new Error('El Usuario no existe')
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(401).json({ msg: error.message })
    }

    //Revisar si el usuario confirma su cuenta
    if (!user.verified) {
        return res.status(401).send({ msg: error.message = "Tu cuenta no ha sido confirmada aun" })
    }

    //Comprobar el passeword

    if (await user.checkPassword(password)) {
        const token = generateJWT(user._id)
        res.json({ token })
    }

    if (!await user.checkPassword(password)) {
        return res.status(401).json({ msg: error.message = "El password es incorrecto" })
    }
}

export {
    register,
    verifyAccount,
    login
}