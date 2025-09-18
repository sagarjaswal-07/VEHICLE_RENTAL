const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_DB_URI)
.then(() =>{
    console.log("✅ Connected to MongoDB:", process.env.MONGO_DB_URI)
    console.log(process.env.PORT)
})
.catch((err) =>{
    console.log(err)
})