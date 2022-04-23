const { Router } = require('express')
const router = Router()

const { generateKeyAndSecret } = require('../controllers/auth.controller')

router.post('/auth/gen/', generateKeyAndSecret)

module.exports = router;


