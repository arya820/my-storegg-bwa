const Nominal = require('./model')

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const alert = { message: alertMessage, status: alertStatus }
            const nominal = await Nominal.find()
            res.render('admin/nominal/view_nominal', {
                name: req.session.user.name,
                title: "Halaman Nominal",
                nominal,
                alert
            })
        } catch (error) {
            req.flash("alertMessage", `${error}`)
            req.flash("alertStatus", 'danger')
            res.redirect('/nominal')
        }
    },
    viewCreate: async (req, res) => {
        try {
            res.render('admin/nominal/create', {
                name: req.session.user.name,
                title: "Halaman Tambah Nominal"
            })
        } catch (error) {
            req.flash("alertMessage", `${error}`)
            req.flash("alertStatus", 'danger')
            res.redirect('/nominal')
        }
    },
    actionCreate: async (req, res) => {
        try {
            const { coinName, coinQuantity, price } = req.body
            const nominal = await new Nominal({
                coinName, coinQuantity, price
            })
            await nominal.save()

            req.flash("alertMessage", "Berhasil tambah Nominal")
            req.flash("alertStatus", 'success')
            res.redirect('/nominal')
        } catch (error) {
            req.flash("alertMessage", `${error}`)
            req.flash("alertStatus", 'danger')
            res.redirect('/nominal')
        }
    },
    viewEdit: async (req, res) => {
        try {
            const {id} = req.params
            const nominal = await Nominal.findOne({_id: id})
            res.render('admin/nominal/edit', {
                name: req.session.user.name,
                title: "Halaman edit Nominal",
                nominal
            })
        } catch (error) {
            req.flash("alertMessage", `${error}`)
            req.flash("alertStatus", 'danger')
            res.redirect('/nominal')
        }
    },
    actionEdit: async (req, res) => {
        try {
            const { id } = req.params
            const { coinName, coinQuantity, price } = req.body
            await Nominal.updateOne({_id: id}, {
                coinName, coinQuantity, price
            })

            req.flash("alertMessage", "Berhasil ubah Kategori")
            req.flash("alertStatus", 'success')

            res.redirect('/nominal')
        } catch (error) {
            req.flash("alertMessage", `${error}`)
            req.flash("alertStatus", 'danger')
            res.redirect('/nominal')
        }
    },
    actionDelete: async (req, res) => {
        try {
            const { id } = req.params
            await Nominal.findByIdAndRemove({_id: id})

            req.flash("alertMessage", "Berhasil hapus Nominal")
            req.flash("alertStatus", 'success')

            res.redirect('/nominal')
        } catch (error) {
            req.flash("alertMessage", `${error}`)
            req.flash("alertStatus", 'danger')
            res.redirect('/nominal')
        }
    }
} 