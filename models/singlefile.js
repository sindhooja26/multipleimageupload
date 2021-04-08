const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const singlefileschema=new Schema({
    fileName:{
        type:String,
        require:true
    },
    filePath:{
        type:String,
        require:true
    },
    fileType:{
        type:String,
        require:true
    },
    fileSize:{
        type:String,
        require:true
    }
},{
    timestamps:true

});

module.exports=mongoose.model('SingleFile',singlefileschema);