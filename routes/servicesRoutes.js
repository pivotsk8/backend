import express from 'express'
import { createService, getServices, getServiceById, updateService } from '../controlers/servicesControllers.js'

const router = express.Router()

router.post('/', createService)
router.get('/', getServices)
router.get('/:id', getServiceById)
router.put('/:id', updateService)

export default router