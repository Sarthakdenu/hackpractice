const User =  require('../models/user')
exports.updateuser = async(req,res)=>
    {
        try
        {
             const {email , newemail , newname , newphone} = req.body
             const user =  await User.findOne({email : email})
             if(!user)
                {
                    res.status(400).json(
                      {   message :"user not registered"}
                    )
                }
                const updateuser= await User.findOneAndUpdate({email:email},{$set:{name : newname,email:newemail,phone:newphone}})
                res.status(200).json(
                    {
                        message:"successfully updated user info",
                        user :updateuser
                    }
                )

        }
        catch(err)
        {
            console.log(err)
            res.status(500).json(
                {
                    message : "invalid error while updating "
                }
            )
        }
    }