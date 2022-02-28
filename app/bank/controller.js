const Bank = require('./model')

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const alert = { message: alertMessage, status: alertStatus }
            const bank = await Bank.find()
            res.render('admin/bank/view_bank', {
                name: req.session.user.name,
                title: "Halaman Bank",
                bank,
                alert
            })
        } catch (error) {
            req.flash("alertMessage", `${error}`)
            req.flash("alertStatus", 'danger')
            res.redirect('/bank')
        }
    },
    viewCreate: async (req, res) => {
        try {
            res.render('admin/bank/create', {
                name: req.session.user.name,
                title: "Halaman Tambah Bank"
            })
        } catch (error) {
            req.flash("alertMessage", `${error}`)
            req.flash("alertStatus", 'danger')
            res.redirect('/bank')
        }
    },
    actionCreate: async (req, res) => {
        try {
            const { name, bankName, noRekening } = req.body
            const bank = await new Bank({
                name, bankName, noRekening
            })
            await bank.save()

            req.flash("alertMessage", "Berhasil tambah bank")
            req.flash("alertStatus", 'success')
            res.redirect('/bank')
        } catch (error) {
            req.flash("alertMessage", `${error}`)
            req.flash("alertStatus", 'danger')
            res.redirect('/bank')
        }
    },
    viewEdit: async (req, res) => {
        try {
            const {id} = req.params
            const bank = await Bank.findOne({_id: id})
            res.render('admin/bank/edit', {
                name: req.session.user.name,
                title: "Halaman Edit Bank",
                bank
            })
        } catch (error) {
            req.flash("alertMessage", `${error}`)
            req.flash("alertStatus", 'danger')
            res.redirect('/bank')
        }
    },
    actionEdit: async (req, res) => {
        try {
            const { id } = req.params
            const { name, bankName, noRekening } = req.body
            await Bank.updateOne({_id: id}, {
                name, bankName, noRekening
            })

            req.flash("alertMessage", "Berhasil ubah Kategori")
            req.flash("alertStatus", 'success')

            res.redirect('/bank')
        } catch (error) {
            req.flash("alertMessage", `${error}`)
            req.flash("alertStatus", 'danger')
            res.redirect('/bank')
        }
    },
    actionDelete: async (req, res) => {
        try {
            const { id } = req.params
            await Bank.findByIdAndRemove({_id: id})

            req.flash("alertMessage", "Berhasil hapus Bank")
            req.flash("alertStatus", 'success')

            res.redirect('/bank')
        } catch (error) {
            req.flash("alertMessage", `${error}`)
            req.flash("alertStatus", 'danger')
            res.redirect('/bank')
        }
    }
} 