const express = require('express')
const router = express.Router()
const { landingPage, detailPage, category, checkout, history, historyDetail, dashboard, profile, editProfile } = require('./controller')
const multer = require('multer')
const os = require('os')
const { isLoginPlayer } = require('../middleware/auth')


// router.use(isLoginPlayer)
router.get('/category', category);
router.get('/landingpage', landingPage);
router.get('/:id/detail', detailPage);
router.post('/checkout', isLoginPlayer, checkout);
router.get('/history', isLoginPlayer, history);
router.get('/history/:id/detail', isLoginPlayer, historyDetail);
router.get('/dashboard', isLoginPlayer, dashboard);
router.get('/profile', isLoginPlayer, profile);
router.put('/profile', isLoginPlayer, multer({dest: os.tmpdir()}).single('image'), editProfile); // dengan ini, di form input harus image


module.exports = router