const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageURL:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
})

fileSchema.post("save", async function(doc) {
    try{
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user : process.env.MAIL_USER,
                password : process.env.MAIL_PASS
            }
        })

        let info = await transporter.sendMail({
            from:`Deepika`,
            to: doc.email,
            subject : `New file uploaded on cloudinary`,
            html : `<h2>Hello!</h2> <p>File uploaded <a href="${doc.imageURL}"> ${doc.imageURL}</a></p>`
        })
    }
    catch(error){
        return res.status(400).json({
            success: false,
            message:"cannot semd mail"
        })
    }
})



const File = mongoose.model("File", fileSchema);
module.exports = File;