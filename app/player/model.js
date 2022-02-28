const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const HASH_ROUND = 10

const playerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email Harus Diisi"]
    },
    name: {
        type: String,
        required: [true, "Nama Harus Diisi"],
        minlength: [3, "Panjang nama harus antara 3 - 225"],
        maxlength: [225, "Panjang nama harus antara 3 - 225"]
    },
    username: {
        type: String,
        required: [true, "Username Harus Diisi"],
        minlength: [3, "Panjang Username harus antara 3 - 225"],
        maxlength: [225, "Panjang Username harus antara 3 - 225"]
    },
    password: {
        type: String,
        required: [true, "Password Harus Diisi"],
        minlength: [8, "Panjang Username harus minimal 8"]
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y'
    },
    avatar: {
        type: String
    },
    filename: {
        type: String
    },
    phoneNumber: {
        type: Number,
        required: [true, "Tipe pembayaran Harus Diisi"],
        minlength: [9, "Panjang Nomor telepon harus antara 9 - 13"],
        maxlength: [13, "Panjang Nomor telepon harus antara 9 - 13"]
    },
    favorite: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
}, {timestamps: true})

// jika email sudah terdaftar
playerSchema.path('email').validate(async function (value){
    try {
        const count = await this.model('Player').countDocuments({email: value})
        return !count
    } catch (error) {
        throw error
    }
}, attr => `${attr.value} sudah terdaftar`)

// encrypt password
playerSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, HASH_ROUND)
    next()
})

module.exports = mongoose.model('Player', playerSchema)