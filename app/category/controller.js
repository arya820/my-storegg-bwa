const Category = require('./model')

module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const alert = { message: alertMessage, status: alertStatus }
            const category = await Category.find()
            // check role jika ingin login multirole
            // if(req.session.user === 'user'){
            //     res.render('admin/category/view_category', {
            //         category,
            //         alert
            //     })
            // } else {
            //     res.redirect('/dashboard')
            // }
            res.render('admin/category/view_category', {
                name: req.session.user.name,
                title: "Halaman Kategori",
                category,
                alert
            })
        } catch (error) {
            req.flash("alertMessage", `${error}`)
            req.flash("alertStatus", 'danger')
            res.redirect('/category')
        }
    },
    viewCreate: async (req, res) => {
        try {
            res.render('admin/category/create', {
                name: req.session.user.name,
                title: "Halaman Tambah Kategori"
            })
        } catch (error) {
            req.flash("alertMessage", `${error}`)
            req.flash("alertStatus", 'danger')
            res.redirect('/category')
        }
    },
    actionCreate: async (req, res) => {
        try {
            const { name } = req.body
            const category = await new Category({
                name
            })
            await category.save()

            req.flash("alertMessage", "Berhasil tambah Kategori")
            req.flash("alertStatus", 'success')
            res.redirect('/category')
        } catch (error) {
            req.flash("alertMessage", `${error}`)
            req.flash("alertStatus", 'danger')
            res.redirect('/category')
        }
    },
    viewEdit: async (req, res) => {
        try {
            const {id} = req.params
            const category = await Category.findOne({_id: id})
            res.render('admin/category/edit', {
                name: req.session.user.name,
                title: "Halaman Edit Kategori",
                category
            })
        } catch (error) {
            req.flash("alertMessage", `${error}`)
            req.flash("alertStatus", 'danger')
            res.redirect('/category')
        }
    },
    actionEdit: async (req, res) => {
        try {
            const { id } = req.params
            const { name } = req.body
            await Category.updateOne({_id: id}, {
                name
            })

            req.flash("alertMessage", "Berhasil ubah Kategori")
            req.flash("alertStatus", 'success')

            res.redirect('/category')
        } catch (error) {
            req.flash("alertMessage", `${error}`)
            req.flash("alertStatus", 'danger')
            res.redirect('/category')
        }
    },
    actionDelete: async (req, res) => {
        try {
            const { id } = req.params
            await Category.findByIdAndRemove({_id: id})

            req.flash("alertMessage", "Berhasil hapus Kategori")
            req.flash("alertStatus", 'success')

            res.redirect('/category')
        } catch (error) {
            req.flash("alertMessage", `${error}`)
            req.flash("alertStatus", 'danger')
            res.redirect('/category')
        }
    }
} 