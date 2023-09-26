import mongoose from 'mongoose'
import { uniqueId } from '../utils/index.js'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        requires: true,
        trim: true
    },
    password: {
        type: String,
        requires: true,
        trim: true
    },
    email: {
        type: String,
        requires: true,
        trim: true,
        unique: true
    },
    token: {
        type: String,
        default: () => uniqueId()
    },
    admin: {
        type: Boolean,
        default: false
    },
    verified: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('User', userSchema)

export default User