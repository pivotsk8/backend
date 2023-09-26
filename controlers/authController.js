import User from '../models/User.js'

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
        await user.save()

        res.json({
            msg: 'El usuario se creo correctamente'
        })
    } catch (error) {
        console.log(error)
    }

}

export {
    register
}