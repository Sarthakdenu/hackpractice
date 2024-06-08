const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
exports.login =async(req,res)=>
    {
        try
        {
             const {email,password} = req.body
             const user = await User.findOne({email:email})
             if(!user)
                {
                    res.status(400).json(
                        {
                            message:"user not registered"
                        }
                    )
                }
            
               if(!bcrypt.compare(password,user.password))
                {
                    res.status(400).json(
                        {
                            message:"invalid user password"
                      }
                    )
                }
                const payload ={
                    email : user.email,
                    role : user.role,
                    name : user.name
                }
                const token = jwt.sign(payload,process.env.JWT_SECRET,{ expiresIn: '2h' }  );
                user.token = token
               user.save()
               res.status(200).json(
                {
                    message:"successfully logging in",
                    user:user,
                    token : token
                }
               )
        }
        catch(err)
        {
            console.log(err)
            res.status(500).json(
                {
                    message:"error while logging in"
                }
            )
        }
    }