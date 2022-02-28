const Voucher = require('./model')
const Nominal = require('../nominal/model')
const Category = require('../category/model')
const path = require('path')
const fs = require('fs')
const config = require('../../config')
module.exports = {
    index: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const alert = { message: alertMessage, status: alertStatus }
            const voucher = await Voucher.find().populate('category').populate('nominals')
            res.render('admin/voucher/view_voucher', {
                name: req.session.user.name,
                title: "Halaman Voucher",
                alert,
                voucher
            })
        } catch (error) {
            req.flash("alertMessage", `${error}`)
            req.flash("alertStatus", 'danger')
            res.redirect('/voucher')
        }
    },
    viewCreate: async (req, res) => {
        try {
            const category = await Category.find()
            const nominal = await Nominal.find()
            res.render('admin/voucher/create', {
                name: req.session.user.name,
                title: "Halaman tambah Voucher",
                category,
                nominal
            })
        } catch (error) {
            req.flash("alertMessage", `${error}`)
            req.flash("alertStatus", 'danger')
            res.redirect('/voucher')
        }
    },
    actionCreate: async (req, res) => {
        try {
            const { name, category, nominals } = req.body
            if(req.file) {
                let tmp_path = req.file.path;
                let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
                let filename = req.file.filename + '.' + originalExt;
                let targetPath = path.resolve(config.rootPath, `public/uploads/${filename}`)

                const src = fs.createReadStream(tmp_path)
                const dest = fs.createWriteStream(targetPath)
                
                src.pipe(dest)

                src.on('end', async () => {
                    try {
                        const voucher = new Voucher({
                            name,
                            category,
                            nominals,
                            thumbnail: filename
                        })
                        await voucher.save()

                        req.flash("alertMessage", "Berhasil tambah Voucher")
                        req.flash("alertStatus", 'success')
                        res.redirect('/voucher')
                    } catch (error) {
                        req.flash("alertMessage", `${error}`)
                        req.flash("alertStatus", 'danger')
                        res.redirect('/voucher')
                    }
                })
            }
            else {
                const voucher = await new Voucher({
                    name,
                    category,
                    nominals
                })
                await voucher.save()

                req.flash("alertMessage", "Berhasil tambah Voucher")
                req.flash("alertStatus", 'success')
                res.redirect('/voucher')
            }
            
        } catch (error) {
            req.flash("alertMessage", `${error}`)
            req.flash("alertStatus", 'danger')
            res.redirect('/voucher')
        }
    },
    viewEdit: async (req, res) => {
        try {
            const {id} = req.params
            const category = await Category.find()
            const nominal = await Nominal.find()
            const voucher = await Voucher.findOne({_id: id}).populate('category').populate('nominals')
            res.render('admin/voucher/edit', {
                name: req.session.user.name,
                title: "Halaman Edit Voucher",
                voucher,
                category,
                nominal
            })
        } catch (error) {
            req.flash("alertMessage", `${error}`)
            req.flash("alertStatus", 'danger')
            res.redirect('/voucher')
        }
    },
    actionEdit: async (req, res) => {
        try {
            const { id } = req.params
            const { name, category, nominals } = req.body
            if(req.file) {
                let tmp_path = req.file.path;
                let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
                let filename = req.file.filename + '.' + originalExt;
                let targetPath = path.resolve(config.rootPath, `public/uploads/${filename}`)

                const src = fs.createReadStream(tmp_path)
                const dest = fs.createWriteStream(targetPath)
                
                src.pipe(dest)

                src.on('end', async () => {
                    try {
                        const voucher = await Voucher.findOne({_id: id})

                        let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`
                        if(fs.existsSync(currentImage)) {
                            fs.unlinkSync(currentImage)
                        }
                        await Voucher.findOneAndUpdate({_id: id}, {
                            name,
                            category,
                            nominals,
                            thumbnail: filename
                        })

                        req.flash("alertMessage", "Berhasil Ubah Voucher")
                        req.flash("alertStatus", 'success')
                        res.redirect('/voucher')
                    } catch (error) {
                        req.flash("alertMessage", `${error}`)
                        req.flash("alertStatus", 'danger')
                        res.redirect('/voucher')
                    }
                })
            }
            else {
                await Voucher.findOneAndUpdate({_id: id}, {
                    name,
                    category,
                    nominals,
                })

                req.flash("alertMessage", "Berhasil Ubah Voucher")
                req.flash("alertStatus", 'success')
                res.redirect('/voucher')
            }
        } catch (error) {
            req.flash("alertMessage", `${error}`)
            req.flash("alertStatus", 'danger')
            res.redirect('/voucher')
        }
    },
    actionDelete: async (req, res) => {
        try {
            const { id } = req.params
            let voucher = await Voucher.findByIdAndRemove({_id: id})
            let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`
            if(fs.existsSync(currentImage)) {
                fs.unlinkSync(currentImage)
            }
            req.flash("alertMessage", "Berhasil hapus Voucher")
            req.flash("alertStatus", 'success')

            res.redirect('/voucher')
        } catch (error) {
            req.flash("alertMessage", `${error}`)
            req.flash("alertStatus", 'danger')
            res.redirect('/voucher')
        }
    },
    actionStatus: async (req, res) => {
        try {
            const { id } = req.params
            const voucher = await Voucher.findOne({_id: id})
            let status = voucher.status === 'Y' ? 'N' : 'Y'

            await Voucher.findOneAndUpdate({_id: id}, {
                status
            })
            req.flash("alertMessage", "Berhasil ubah Status")
            req.flash("alertStatus", 'success')

            res.redirect('/voucher')

        } catch (error) {
            req.flash("alertMessage", `${error}`)
            req.flash("alertStatus", 'danger')
            res.redirect('/voucher')
        }
    }
}