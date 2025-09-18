const mongoose = require("mongoose")

const vehicleAvailabilitySchema = new mongoose.Schema({
    ownerId:{type:mongoose.Schema.Types.ObjectId,ref:"owners"},
    vehicleId:{type:mongoose.Schema.Types.ObjectId,ref:"vehicles"},
    weekStartDate:{type:String,default:null},
    weekEndDate:{type:String,default:null},
    monday:{type:String,default:null},
    tuesday:{type:String,default:null},
    wednesday:{type:String,default:null},
    thursday:{type:String,default:null},
    friday:{type:String,default:null},
    saturday:{type:String,default:null},
    sunday:{type:String,default:null},
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now()}
})

module.exports = new mongoose.model("availabilties",vehicleAvailabilitySchema);