const express = require('express')
const helmet = require('helmet')
require('dotenv').config()

const port = process.env.PORT
const SCPRoutes = require('./routes/scp')
const AuthRoutes = require('./routes/auth')

const app = express()


//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(helmet())
app.use(AuthRoutes)
app.use(SCPRoutes)





app.listen(port, ()=>{
    console.log(`Listening at port ${port}`)
})