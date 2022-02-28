const Payment = require('./model')
const Bank = require('../bank/model')
module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const alert = { message: alertMessage, status: alertStatus }
            const payment = await Payment.find().populate('banks')
            res.render('admin/payment/view_payment', {
                name: req.session.user.name,
                title: "Halaman Jenis Pembayaran",
                payment,
                alert
            })
        } catch (error) {
            req.flash("alertMessage", `${error}`)
            req.flash("alertStatus", 'danger')
            res.redirect('/payment')
        }
    },
    viewCreate: async (req, res) => {
        try {
            const banks = await Bank.find()
            res.render('admin/payment/create', {
                name: req.session.user.name,
                title: "Halaman Tambah Pembayaran",
                banks
            })
        } catch (error) {
            req.flash("alertMessage", `${error}`)
            req.flash("alertStatus", 'danger')
            res.redirect('/payment')
        }
    },
    actionCreate: async (req, res) => {
        try {
            const { type, banks } = req.body
            const payment = await new Payment({
                type, banks
            })
            await payment.save()

            req.flash("alertMessage", "Berhasil tambah Payment")
            req.flash("alertStatus", 'success')
            res.redirect('/payment')
        } catch (error) {
            req.flash("alertMessage", `${error}`)
            req.flash("alertStatus", 'danger')
            res.redirect('/payment')
        }
    },
    viewEdit: async (req, res) => {
        try {
            const {id} = req.params
            const banks = await Bank.find()
            const payment = await Payment.findOne({_id: id}).populate('banks')
            res.render('admin/payment/edit', {
                name: req.session.user.name,
                title: "Halaman Edit Pembayaran",
                payment,
                banks
            })
        } catch (error) {
            req.flash("alertMessage", `${error}`)
            req.flash("alertStatus", 'danger')
            res.redirect('/payment')
        }
    },
    actionEdit: async (req, res) => {
        try {
            const { id } = req.params
            const { type, banks } = req.body
            await Payment.updateOne({_id: id}, {
                type, banks
            })

            req.flash("alertMessage", "Berhasil ubah Payment")
            req.flash("alertStatus", 'success')

            res.redirect('/payment')
        } catch (error) {
            req.flash("alertMessage", `${error}`)
            req.flash("alertStatus", 'danger')
            res.redirect('/payment')
        }
    },
    actionDelete: async (req, res) => {
        try {
            const { id } = req.params
            await Payment.findByIdAndRemove({_id: id})

            req.flash("alertMessage", "Berhasil hapus Payment")
            req.flash("alertStatus", 'success')

            res.redirect('/payment')
        } catch (error) {
            req.flash("alertMessage", `${error}`)
            req.flash("alertStatus", 'danger')
            res.redirect('/payment')
        }
    },
    actionStatus: async (req, res) => {
        try {
            const { id } = req.params
            const payment = await Payment.findOne({_id: id})
            let status = payment.status === 'Y' ? 'N' : 'Y'

            await Payment.findOneAndUpdate({_id: id}, {
                status
            })
            req.flash("alertMessage", "Berhasil ubah Status")
            req.flash("alertStatus", 'success')

            res.redirect('/payment')
        } catch (error) {
            req.flash("alertMessage", `${error}`)
            req.flash("alertStatus", 'danger')
            res.redirect('/payment')
        }
    }
} 