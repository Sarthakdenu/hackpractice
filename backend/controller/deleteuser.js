const User = require('../models/user')
exports.deleteuser =async(req,res)=>
    {
        try{
            const {email} = req.body
            const user =  await User.findOne({email:email})
            if(!user)
                {
                    res.status(400).json(
                        {
                            message:"suer not registered"
                        }
                    )
                }
            const deleteuser = await User.findOneAndDelete({email:email})
            res.status(200).json(
                {
                    messgae :"successfully deleted user info",
                    deleteduser : deleteuser
                }
            )
        } 
        catch(err)
        {
            console.log(err)
            res.status(500).json(
                {
                    message:"error while deleting info"
                }
            )
        }
    }