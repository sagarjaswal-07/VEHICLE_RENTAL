const mongoose = require("mongoose")

const ownerSchema = new mongoose.Schema({
    name:{type:String,default:null},
    email:{type:String,default:null},
    password:{type:String,default:null},
    contact:{type:String,default:null},
    address:{type:String,default:null},
    userId:{type:mongoose.Schema.Types.ObjectId,default:null, ref:"users"},
    zipCode:{type:String,default:null},
    ownerImage:{type:String,default:"no_img.jpg"},
    userType:{type:Number,default:2},
    status:{type:String,default:"Unblock"},
    createdAt:{type:Date,default:Date.now()}
})

module.exports = new mongoose.model("owners",ownerSchema) 