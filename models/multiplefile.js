const mongoose =require('mongoose');


const Schema=mongoose.Schema;

const multipleFileSchema=new Schema({
    title:{
        type:String,
        require:true
    },
    files:[Object]
},{timeStamp:true
});

module.exports =mongoose.model('MultipleFile',multipleFileSchema);