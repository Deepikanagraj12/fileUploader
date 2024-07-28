const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req,res) => {
    try {
        const file = req.files.file;
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        file.mv(path, (error) => {
            console.log(error)
        })

        res.json({
            success:true,
            message:"local file uploaded successfully"
        })
    }
    catch (error) {
        console.log(error)
    }
 }

 function typeCheck(type, supportedTypes){
    return supportedTypes.includes(type);
 }

 async function cloudinaryImageUploader(file , folder, quality) {
    if(quality){
        options.quality = quality;
    }
    const options = {folder}
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
 }

 exports.imageUpload = async (req,res) => {
    try{
        const {name, tags, email} = req.body;
        const file = req.files.imageFile;

        const supportedTypes = ["jpg", "png", "jpeg"];
        const type = file.name.split('.')[1].toLowerCase();
        
        if(!typeCheck(type, supportedTypes)){
            return res.stauts(400).json({
                success:false,
                meassage:"file format not supported"
            })
        }

        const response = await cloudinaryImageUploader(file, "FileUploaderProj");

        const fileData = File.create({
            name,
            tags,
            email,
            imageURL:response.secure_url,
        })

        return res.status(400).json({
            success:true,
            message:"image uploaded ",
            imageURL:response.secure_url,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"cannot upload file",
        })
    }
 }

 exports.videoUpload = async (req,res) => {
    try{
        const {name, tags, email} = req.body;
        const file = req.files.imageFile;

        const supportedTypes = ["mp4", "mov"];
        const type = file.name.split('.')[1].toLowerCase();
        
        if(!typeCheck(type, supportedTypes)){
            return res.stauts(400).json({
                success:false,
                meassage:"file format not supported"
            })
        }

        const response = await cloudinaryImageUploader(file, "FileUploaderProj");

        const fileData = File.create({
            name,
            tags,
            email,
            imageURL:response.secure_url,
        })

        return res.status(400).json({
            success:true,
            message:"video uploaded ",
            imageURL:response.secure_url,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"cannot upload file",
        })
    }
 }

 exports.imageCompressor = async (req,res) => {
    try{
        const {name, tags, email} = req.body;
        const file = req.files.imageFile;

        const supportedTypes = ["jpg", "png", "jpeg"];
        const type = file.name.split('.')[1].toLowerCase();
        
        if(!typeCheck(type, supportedTypes)){
            return res.stauts(400).json({
                success:false,
                meassage:"file format not supported"
            })
        }

        const response = await cloudinaryImageUploader(file, "FileUploaderProj" , 90);

        const fileData = File.create({
            name,
            tags,
            email,
            imageURL:response.secure_url,
        })

        return res.status(400).json({
            success:true,
            message:"image compressed ",
            imageURL:response.secure_url,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"cannot upload file",
        })
    }
 }