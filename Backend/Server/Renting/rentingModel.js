const mongoose = require("mongoose")

const rentingSchema = new mongoose.Schema({
    ownerId:{type:mongoose.Schema.Types.ObjectId,ref:"owners"},
    vehicleId:{type:mongoose.Schema.Types.ObjectId,ref:"vehicles"},
    customerId:{type:mongoose.Schema.Types.ObjectId,ref:"customers"},
    days:{type:String,default:null},
    startDate:{type:String,default:null},
    endDate:{type:String,default:null},
    totalPrice:{type:String,default:null},
    specialRequest:{type:String,default:null},
    pickupLocation:{type:String,default:null},
    dropLocation:{type:String,default:null},
    status:{type:String,default:"Pending"},
    createdAt:{type:Date,default:Date.now()}
})

module.exports = new mongoose.model("rentings",rentingSchema);