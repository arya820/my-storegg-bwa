const mongoose = require('mongoose')

const voucherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Nama Game Harus Diisi"]
    },
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y'
    },
    thumbnail: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    nominals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Nominal"
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"                                 // ke model di folder Users
    }
}, {timestamps: true})

module.exports = mongoose.model('Voucher', voucherSchema)