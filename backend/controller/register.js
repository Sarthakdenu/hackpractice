const User = require('../models/user')
const bcrypt = require('bcrypt')
exports.register= async(req,res)=>
    {
        try
        {
            const {email,password,name,role,phone} = req.body
            const user = await User.findOne({email:email})
            if(user)
                {
                    res.status(400).json(
                        {
                            message:"user already registered"
                        }
                    )
                }
                const hashedpassword = await bcrypt.hash(password,10)
                if(!hashedpassword)
                    {
                        res.status(400).json(
                            {
                                message :"error while hashing password"
                            }
                        )
                    }
                    const newuser = new User(
                        {
                           email,
                           name,
                           password,
                           role,
                           phone
                        }
                    )
                    const saveuser= await newuser.save()
                    res.status(200).json(
                        {
                            message :"successfully registered user",
                            user : saveuser
                        }
                    )
        }
        catch(err)
        {
            console.log(err)
            res.status(500).json(
                {
                    message :"error while register"
                }
            )
        }
    }