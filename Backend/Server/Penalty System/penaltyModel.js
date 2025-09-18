
const mongoose = require("mongoose")

const penaltySchema = new mongoose.Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "owners" },
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "vehicles" },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "customers" },
    rentalId: { type: mongoose.Schema.Types.ObjectId, ref: "rentings" },
    penaltyAmount: { type: String, default: null },
    penaltyType: { type: mongoose.Schema.Types.ObjectId,ref:"penaltyRules" },
    penaltyDescription: { type: String, default: null },
    issuedDate:{type:String,default:null},
    dueDate:{type:String,default:null},
    status: { type: String, default: "Pending" },
    paymentStatus:{type:String,default:"Unpaid"},
    createdAt: { type: Date, default: Date.now() }
})

module.exports = new mongoose.model("penalties", penaltySchema);