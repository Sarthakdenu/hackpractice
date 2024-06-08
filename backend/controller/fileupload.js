const File = require('../models/file')

exports.uploadfile = async(req,res)=>
    {
        try
        {
           const file = req.files.file
           console.log("file agai = ",file)
           let path = __dirname + "/files/"+Date.now()+`.${file.name.split('.')[1]}`;
           file.mv(path,(err)=>
        {
            console.log(err)
        })
           res.status(200).json(
            {
                message:"successfully upload file info"
            }
           )
        }
        catch(err)
        {
            res.status(500).json(
                {
                    message:"error while uploading file"
                }
            )
        }
    }