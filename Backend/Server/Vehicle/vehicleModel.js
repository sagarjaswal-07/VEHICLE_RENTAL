const mongoose = require("mongoose")

const vehicleSchema = new mongoose.Schema({
    vehicleName:{type:String,default:null},
    ownerId:{type:mongoose.Schema.Types.ObjectId, ref:"owners"},
    categoryId:{type:mongoose.Schema.Types.ObjectId, ref:"categories"},
    make:{type:String,default:null},
    model:{type:String,default:null},
    year:{type:String,default:null},
    plateNumber:{type:String,default:null},
    feulType:{type:String,default:null},//petrol,diesel,electric
    mileage:{type:String,default:null},//distance driven
    transmission:{type:String,default:null},//automatic/manual
    vehicleImage:{type:String,default:null},
    pricePerDay:{type:String,default:null},
    available:{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now()}
})

module.exports = new mongoose.model("vehicles",vehicleSchema) 