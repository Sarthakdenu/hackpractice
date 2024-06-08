const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authorization = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({
                message: "user not registered"
            });
        }
       
        if (!user.token) {
            return res.status(400).json({
                message: "token not found"
            });
        }
        try {
            console.log(user.token);
            jwt.verify(user.token, process.env.JWT_SECRET);
            console.log("authorization completerd")
            
            next();
        } catch (err) {
            console.log(err);
            return res.status(400).json({
                message: "invalid token"
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "error while authorization"
        });
    }
};

exports.isadmin=async(req,res,next)=>
    {
        try
        {
             const {email}= req.body
             const user=await User.findOne({email:email})
             if(!user)
                {
                    res.status(400).json(
                        {
                            message:"email not registerd"
                        }
                    )
                }
                if(user.token==="")
                    next()
                if(user.role==="admin")
                    {
                        res.status(200).json({
                            message:"welcome to protected route for admin"
                        })
                        next()
                    }else
                    {
                        res.status(400).json({
                            message:"proteced route for admin"
                        })
                    }
         
        }
        catch(err)
        {
            console.log(err)
            res.status(500).json(
                {
                    message:"error while going in route of isadmin"
                }
            )

        }
    }
