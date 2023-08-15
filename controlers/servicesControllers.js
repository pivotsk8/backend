import mongoose from 'mongoose'
import { services } from '../data/beautyServices.js'
import Services from '../models/Services.js'

const createService = async (req, res) => {
    const error = new Error('Todos los campos son obligatorios')
    if (Object.values(req.body).includes('')) {
        return res.status(400).json({ msg: error.message })
    }


    try {
        const service = new Services(req.body)
        await service.save()
        res.json({ msg: 'El servicio se creo correctamente' })
    } catch (error) {
        console.log(error)
    }
}


const getServices = async (req, res) => {
    res.json(services)
}

const getServiceById = async (req, res) => {
    const { id } = req.params
    //Validar que el id exista
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error('El ID no es valido')

        return res.status(400).json({
            msg: error.message
        })
    }

    //validar que el servico exista
    const service = await Services.findById(id)
    if (!service) {
        const error = new Error('El Servico no existe')

        return res.status(404).json({
            msg: error.message
        })
    }

    //Mostrar el servicio
    res.json(service)
}

export {
    createService,
    getServices,
    getServiceById
}