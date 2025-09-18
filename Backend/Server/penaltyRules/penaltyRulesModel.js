const mongoose = require("mongoose")

const penaltyRulesSchema = new mongoose.Schema({
   penaltyRules:{type:String,default:null},
   status:{type:Boolean,default:true},
   createdAt:{type:Date,default:Date.now()}
})

module.exports = new mongoose.model("penaltyRules",penaltyRulesSchema);