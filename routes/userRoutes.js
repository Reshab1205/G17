const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const auth = require('../middlewares/auth')

router.get('/', (req,res) => {
    res.send('Hello G17')
})
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/update/:_id', userController.updateUser)
router.get('/home', auth, (req,res) => {
    res.send('hello I am Homepage')
})

router.post('/add-delivery-address/:id', userController.addDeliveryAddress)
router.post('/add-card/:id', userController.addPaymentMethod)



module.exports = router