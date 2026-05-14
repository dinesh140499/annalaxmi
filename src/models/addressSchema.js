const mongoose=require('mongoose')

const addressSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    companyname:{
        type: String,
        required:true
    },
    street:{
        type:String,
        required:true,
        trim:true
    },
    country:{
        type:String,
        required:true,
    },
    state: {
        type: String,
        required: true,
      },
    zipcode: {
        type: String,
        required: true,
    },
})

module.exports=addressSchema