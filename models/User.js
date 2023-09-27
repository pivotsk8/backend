import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
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
        unique: true,
        lowercase: true
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

userSchema.pre('save', async function (next) {
    !this.isModified('password')
        ? next()
        : null

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.checkPassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User