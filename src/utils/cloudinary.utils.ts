const cloudinary = require("cloudinary").v2
require("dotenv").config()
          
cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret 
});

export const uploadFile = async(file:string)=>{
    try{
      console.log("upload file called")
      console.log(file)
        const result = await cloudinary.uploader.upload(file)
        return result
    }catch(err){
     console.log(err)
    }
}

