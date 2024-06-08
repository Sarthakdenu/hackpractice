const mongoose = require('mongoose')

const userschema = new mongoose.Schema(
    {
        name :
        {
            type : String,
            required:true
        },
        phone :
        {
            type: Number,
            required: true
        },
        email :
        {
            type : String,
            required : true
        },
        password :
        {
            type : String,
            required: true
        },
        token:
        {
            type : String ,
        },
        role :
        {
            type : String,
            required:true
        }
    }
)

module.exports = mongoose.model('User',userschema)