const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email Harus Diisi"]
    },
    name: {
        type: String,
        required: [true, "Nama Harus Diisi"]
    },
    password: {
        type: String,
        required: [true, "Password Harus Diisi"]
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'admin'
    },
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y'
    },
    phoneNumber: {
        type: Number,
        required: [true, "Tipe pembayaran Harus Diisi"]
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)