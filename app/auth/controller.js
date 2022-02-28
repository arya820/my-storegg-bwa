// api login untuk player

const Player = require('../player/model')
const path = require('path')
const fs = require('fs')
const config = require('../../config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
module.exports = {
    signup: async (req, res, next) => {
        try {
            // const {email, name, username, password, phoneNumber, favorite} = req.body
            const payload = req.body

            if (req.file) {
                let tmp_path = req.file.path;
                let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
                let filename = req.file.filename + '.' + originalExt;
                let targetPath = path.resolve(config.rootPath, `public/uploads/${filename}`)

                const src = fs.createReadStream(tmp_path)
                const dest = fs.createWriteStream(targetPath)
                
                src.pipe(dest)

                src.on('end', async () => {
                    try {
                        let player = new Player({
                            ...payload,
                            avatar: filename
                        })
                        await player.save()

                        delete player._doc.password
                        res.status(201).json({data: player})
                    } catch (error) {
                        if (error && error.name === "ValidationError") {
                            return res.status(422).json({
                                error: 1,
                                message: error.message,
                                field: error.errors
                            })
                        }
                        next(error)
                    }
                })
            } else {
                let player = new Player(payload)

                await player.save()
                delete player._doc.password
                res.status(201).json({data: player})
            }

            // res.status(201).json({
            //     message: payload
            // })
        } catch (error) {
            if (error && error.name === "ValidationError") {
                return res.status(422).json({
                    error: 1,
                    message: error.message,
                    field: error.errors
                })
            }
            next(error)
        }
    },
    signin: (req, res, next) => {
        const {email, password} = req.body
        // console.log(email)
        Player.findOne({ email: email }).then((player) => {
            // console.log(player)
            if (player) {
                const checkPassword = bcrypt.compareSync(password, player.password)
                if (checkPassword) {
                    const token = jwt.sign({
                        player: {
                            id: player.id,
                            username: player.username,
                            email: player.email,
                            nama: player.name,
                            phoneNumber: player.phoneNumber,
                            avatar: player.avatar
                        }
                    }, config.jwtKey)

                    res.status(200).json({
                        data: token
                    })
                } else {
                    res.status(403).json({
                        message: "Wrong Password"
                    })
                }
            } else {
                res.status(403).json({
                    message: "Email Not found"
                })
            }
        }).catch((err)=> {
            res.status(500).json({
                message: err.message || 'Internal Server Error'
            })
            next()
        })
    }
}