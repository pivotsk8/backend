import Services from '../models/Services.js'
import { validateObjectId, handleNotFoundError } from '../utils/index.js'

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
    const result = await Services.find()

    try {
        res.json(result)
    } catch (error) {
        console.log(error)
    }

}

const getServiceById = async (req, res) => {
    const { id } = req.params
    //Validar que el id exista
    if (validateObjectId(id, res)) return

    //validar que el servico exista
    const service = await Services.findById(id)
    if (!service) {
        return handleNotFoundError('El servicio no exite', res);
    }

    //Mostrar el servicio
    res.json(service)
}

const updateService = async (req, res) => {
    const { id } = req.params
    //Validar que el id exista
    if (validateObjectId(id, res)) return

    const service = await Services.findById(id)
    if (!service) {
        return handleNotFoundError('El servicio no exite', res);
    }

    //Escribimos en el obj los valores nuevos
    service.name = req.body.name || service.name
    service.price = req.body.price || service.price

    try {
        await service.save()
        return res.json({
            msg: 'El servicio se actualizo correctamente'
        })
    } catch (error) {
        console.log(error)
    }
}

const deleteService = async (req, res) => {
    const { id } = req.params
    //Validar que el id exista
    if (validateObjectId(id, res)) return

    const service = await Services.findById(id)
    if (!service) {
        return handleNotFoundError('El servicio no exite', res);
    }

    try {
        await service.deleteOne()
        return res.json({
            msg: 'El servicio se elimino correctamente'
        })
    } catch (error) {
        console.log(error)
    }
}

export {
    createService,
    getServices,
    getServiceById,
    updateService,
    deleteService
}