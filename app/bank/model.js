const mongoose = require('mongoose')

const bankSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Nama Pemilik bank Harus Diisi"]
    },
    bankName: {
        type: String,
        required: [true, "Nama bank Harus Diisi"]
    },
    noRekening: {
        type: String,
        required: [true, "Nomor rekening Harus Diisi"],
    }
}, {timestamps: true})

module.exports = mongoose.model('Bank', bankSchema)