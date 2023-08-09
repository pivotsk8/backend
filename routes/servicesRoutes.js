import express from 'express'
import { services } from '../data/beautyServices.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.send(services)
})

export default router