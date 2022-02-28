const User = require('./model')
const bcrypt = require('bcryptjs')

module.exports = {
    viewSignIn: async (req, res) => {
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const alert = { message: alertMessage, status: alertStatus }
            if (req.session.user === null || req.session.user === undefined) {
                res.render('admin/users/view_signin', {
                    title: "Halaman Sign In",
                    alert
                })
            } else {
                res.redirect('/dashboard')
            }

            
        } catch (error) {
            req.flash("alertMessage", `${error}`)
            req.flash("alertStatus", 'danger')
            res.redirect('/')
        }
    },
    actionSignIn: async (req, res) => {
        try {
            const { email, password } = req.body
            const check = await User.findOne({email: email})
            // console.log(check)
            if (check) {
                if (check.status === 'Y') {
                    const checkPassword = await bcrypt.compare(password, check.password)
                    if (checkPassword) {
                        req.session.user = {
                            id: check._id,
                            email: check.email,
                            name: check.name,
                            status: check.status,
                            role: check.role
                        }
                        res.redirect('/dashboard')
                    } else {
                        req.flash("alertMessage", "incorrect password")
                        req.flash("alertStatus", 'danger')
                        res.redirect('/')
                    }
                } else {
                    req.flash("alertMessage", "Your email isn't active")
                    req.flash("alertStatus", 'danger')
                    res.redirect('/')
                }
            } else {
                req.flash("alertMessage", "Email not found")
                req.flash("alertStatus", 'danger')
                res.redirect('/')
            }
        } catch (error) {
            req.flash("alertMessage", `${error}`)
            req.flash("alertStatus", 'danger')
            res.redirect('/')
        }
    },
    actionLogout: (req, res) => {
        req.session.destroy()
        res.redirect('/')
    }
}