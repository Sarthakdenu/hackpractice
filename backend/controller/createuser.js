const User = require('../models/user')

exports.createuser = async(req,res)=>
    {
        try{
              const {name,phone,email,password,role}=req.body
              const user =  new User(
                {
                    name,
                    phone,
                    email,
                    password,
                    role
                }
              )
              const saveuser = await user.save()
              console.log(saveuser)
              res.status(200).json(
                {
                    message :"successfully created user",
                    user : saveuser
                }
              )
        }
        catch(err)
        {
            console.log(err)
            res.status(500).json(
                {
                    messgae:"error while creating  user"
                }
            )
        }
    }