const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, "Tipe pembayaran Harus Diisi"]
    },
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y'
    },
    banks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bank'
    }]
}, {timestamps: true})

module.exports = mongoose.model('Payment', paymentSchema)