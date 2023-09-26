import User from '../models/User.js'

const register = async (req, res) => {
    const error = new Error('Todos los campos son obligatorios')

    //Valida campos
    Object.values(req.body).includes('')
        ? (res.status(400).json({ msg: error.message }))
        : null

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