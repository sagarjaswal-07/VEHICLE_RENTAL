const customer = require("./customerModel")
const user = require("../User/userModel")
const bcrypt = require("bcrypt")
const roundValue = 10;

register = (req,res) =>{
    valiadtionError = []
    if(!req.body.name){
        valiadtionError.push("Name is required")
    }
    if(!req.body.email){
        valiadtionError.push("Email is required")
    }
    if(!req.body.password){
        valiadtionError.push("Password is required")
    }
    if(!req.body.contact){
        valiadtionError.push("Contact is required")
    }
    if(valiadtionError.length > 0){
        res.json({
            status:422,
            success:false,
            message:"Validation error occurs",
            error:valiadtionError
        })
    }
    else{
        user.findOne({email:req.body.email})
        .then((userData) =>{
           if(!userData){
            let useObj = new user()
            useObj.name = req.body.name
            useObj.email = req.body.email
            useObj.password = bcrypt.hashSync(req.body.password,roundValue)
            useObj.save()
            .then(
                (userRes) =>{
                let cuObj = new customer()
                cuObj.name = req.body.name
                cuObj.email = req.body.email
                cuObj.password = req.body.password
                cuObj.contact = req.body.contact
                cuObj.userId = userRes._id
                cuObj.save()
                .then((cuRes) =>{
                   useObj.customerId = cuRes._id
                   useObj.save()
                   .then(() =>{
                    res.json({
                        status:200,
                        success:true,
                        message:"User registered Successfully",
                        data:cuRes
                    })
                   })
                })
                .catch((err) =>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server Error",
                        errors:err.message
                    })
                })
                }
            )
            .catch((err) =>{
                res.json({
                    status:500,
                    success:false,
                    message:"Internal server Error",
                    errors:err.message
                })
            })
           }
           else{
            res.json({
                status:422,
                success:false,
                message:"User already exist",
                data:userData
            })
           }
        }
    )
    .catch((err) =>{
        res.json({
            status:500,
            success:false,
            message:"Internal server Error",
            errors:err.message
        })
    })
    }
}

getall = async(req,res) =>{
    const totalCount = await customer.countDocuments().exec()
    customer.find()
    .then((customerData) =>{
        res.json({
            status:200,
            success:true,
            message:"Data loaded successfully",
            data:customerData,
            count:totalCount
        })
    })
    .catch((err) =>{
        res.json({
            status:500,
            success:false,
            message:"Internal server error",
            errors:err.message
        })
    })
}


module.exports = {
    register,
    getall
}