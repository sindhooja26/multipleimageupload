'use strict';
const SingleFile= require('../models/singlefile');
const MultipleFile=require('../models/multiplefile');

const singlefileupload= async(req,res,next)=>{
    try{
        const file= new SingleFile({
            fileName:req.file.originalname,
            filePath:req.file.path,
            fileType:req.file.mimetype,
            fileSize:filesizeFormatter(req.file.size)
        });
        await file.save();
       
        res.status(200).send('file uploaded successfully');
    }catch(error){
        res.status(400).send(error.message);
    }
}
const multiplefileupload=async(req,res,next)=>{
    try{
        let filesArray =[];
        req.files.forEach(element => {
            const file= {
            fileName:element.originalname,
            fillePath:element.path,
            fileType:element.mimetype,
            filesize:filesizeFormatter(element.size,2)
            }
            filesArray.push(file);
        });
        const multiplefile =new MultipleFile({
            title:req.body.title,
            files:filesArray
        })
        await multiplefile.save();
        res.send(200).send('file uploaded successfully');
    }catch(error){
        res.send(400).send(error.message);

    }
}
const getallSingleFiles=async(req,res,next)=>{
    try{
        const files=await SingleFile.find();
        res.status(200).send(files);

    }catch(error){
        res.status(400).send(error.message);
    }
}
const getallMultipleFiles=async(req,res,next)=>{
    try{
        const files=await MultipleFile.find();
        res.status(200).send(files);

    }catch(error){
        res.status(400).send(error.message);
    }
}


const filesizeFormatter=(bytes,decimal)=>{
    if(bytes===0){
        return '0 bytes'; 
    }
    const dm=decimal||2;
    const sizes=['Bytes','KB','MB','GB','TB','PB','EB','YB','ZB'];
    const index=Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes/Math.pow(1000,index)).toFixed(dm))+'-'+sizes[index];
}

 module.exports={
     singlefileupload,
     multiplefileupload,
     getallSingleFiles,
     getallMultipleFiles
    }