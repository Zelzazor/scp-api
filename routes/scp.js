const { Router } = require('express')
const router = Router()
const isAuthenticated = require('../middlewares/auth.middleware')

const {getAllSCPs, getSCP, getRandomSCP, get404} = require('../controllers/scp.controller')

router.get('/scp/', isAuthenticated,  getAllSCPs)
router.get('/scp/:number([0-9]{3,4})',isAuthenticated, getSCP)
router.get('/scp/random',isAuthenticated, getRandomSCP)
router.get('*', get404)

module.exports = router;