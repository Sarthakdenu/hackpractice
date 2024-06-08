const User = require('../models/user')

exports.getinfo = async(req,res)=>
    {
        try
        {
             const users  = await User.find({})
             console.log("hii")
             res.status(200).json(
                {
                    message:"successfully fetched user info",
                    user : users
                }
             )
        }
        catch(err)
        {
            res.status(500).json(
                {
                    message:"error while getting info"
                }
            )
        }
    }