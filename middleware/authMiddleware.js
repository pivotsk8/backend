
const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization
    if (token && token.startsWith('Bearer')) {
        console.log('Si hay Token')
    }

    if (!req.headers.authorization) {
        const error = new Error('Token no valido o inexistente')
        res.status(403).json({ msg: error.message })
    }
    // next()
}

export default authMiddleware