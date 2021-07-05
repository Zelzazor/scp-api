const { Router } = require('express')
const router = Router()

const {getAllSCPs, getSCP, getRandomSCP} = require('../controllers/scp.controller')

router.get('/scp/', getAllSCPs)
router.get('/scp/:number([0-9]{3,4})', getSCP)
router.get('/scp/random', getRandomSCP)

module.exports = router;