const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    historyVoucherTopup: {
        gameName: {type: String, required: [true, "Nama Game harus diisi"]},
        category: {type: String, required: [true, "Kategori harus diisi"]},
        thumbnail: {type: String},
        coinName: {type: String, required: [true, "Nama Koin harus diisi"]},
        coinQuantity: {type: String, required: [true, "Jumlah Koin harus diisi"]},
        price: {type: Number}
    },
    historyPayment: {
        name: {type: String, required: [true, "Nama harus diisi"]},
        type: {type: String, required: [true, "Tipe Pembayaran harus diisi"]},
        bankName: {type: String, required: [true, "Nama Bank harus diisi"]},
        noRekening: {type: String, required: [true, "Nomor rekening harus diisi"]}
    },
    name: {
        type: String,
        required: [true, "Nama Harus Diisi"],
        minlength: [3, "Panjang nama harus antara 3 - 225"],
        maxlength: [225, "Panjang nama harus antara 3 - 225"]
    },
    accountUser: {
        type: String,
        required: [true, "Nama akun Harus Diisi"],
        minlength: [3, "Panjang akun player harus antara 3 - 225"],
        maxlength: [225, "Panjang akun player harus antara 3 - 225"]
    },
    tax: {
        type: Number,
        default: 0
    },
    value: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending'
    },
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    },
    historyUser: {
        name: {type: String, required: [true, "Nama Player harus diisi"]},
        phoneNumber: {
            type: Number,
            required: [true, "Nomor telepon Harus Diisi"],
            minlength: [9, "Panjang Nomor telepon harus antara 9 - 13"],
            maxlength: [13, "Panjang Nomor telepon harus antara 9 - 13"]
        }
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {timestamps: true})

module.exports = mongoose.model('Transaction', transactionSchema)