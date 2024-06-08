const express = require('express')
const cors=require('cors')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 4000
console.log(process.env.PORT )
const {connectdb} = require('./config/database')
connectdb()
app.use(express.json())
app.use(cors())
const route = require('./route/route')
const fileupload = require('express-fileupload')
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))
const {connectcloudinary}= require('./config/cloudinary')
connectcloudinary()
app.use('/api/v1',route)
app.listen(PORT , ()=>
{
    console.log("Server running on PORT ",PORT)
})