const File = require('../models/file')
const cloudinary = require('cloudinary').v2
exports.imageupload = async(req,res)=>
    {
        async function uploadtocloudinary(file,folder)
        {
            const options = {folder}
            return await cloudinary.uploader.upload(file.tempFilePath,options)
        }
        try
        {
              const {name,email,tags}=req.body
              const file = req.files.file
              console.log(file)
              const supportedfiletype = ['jpg','jpeg']
              if(!supportedfiletype.includes(file.name.split('.')[1].toLowerCase()))
                {
                     res.status(400).josn(
                        {
                            message:"file type not supported"
                        }
                     )
                }
                console.log("helo")
                const response = await uploadtocloudinary(file,"sarthakdb")
                console.log("helol")
                console.log(response)
                const newfile = new File({
                    name,
                    email,
                    tags,
                    imageurl:response.secure_url
                })
                const savefile = await newfile.save()
                res.status(200).json(
                    {
                        message:"succesfully uploaded to cloudinary",
                        imageurl :response.secure_url,
                        file:newfile

                    }
                )
        }
        catch(err)
        {
            console.log(err)
            res.status(500).json(
             {
                message:"eror while uploading image"
             }
            )
        }
    }