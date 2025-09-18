const user = require("./userModel")
const bcrypt = require("bcrypt")
var jwt = require("jsonwebtoken")
var privateKey = process.env.JWT_SECRET
login = (req,res) =>{
    let validationError = []
     if(!req.body.email){
        validationError.push("Email is required")
     }
     if(!req.body.password){
        validationError.push("Password is required")
     }
     if(validationError.length > 0){
        res.json({
            status:422,
            success:false,
            message:"validation error occurs",
            error:validationError
        })
     }
     else{
        user.findOne({email:req.body.email})
        .then((userData) =>{
            if(!userData){
                res.json({
                    status:422,
                    success:false,
                    message:"Email not matched"
                })
            }
            else{
                bcrypt.compare(req.body.password,userData.password,function(err,result){
                    if(result) {
                        var payload = {
                            name:userData.name,
                            email:userData.email,
                            userType:userData.userType,
                            userId:userData._id
                        }
                        var token = jwt.sign(payload,privateKey, { expiresIn: '1h' })
                        res.json({
                            status:200,
                            success:true,
                            message:"Login successfull",
                            tokenData:token,
                            data:userData
                        })
                    }
                    else{
                        res.json({
                            status:422,
                            success:false,
                            message:"Invalid password",

                        })
                    }
                })
            }
        })
        .catch((err) =>{
            res.json({
                status:500,
                success:false,
                message:"Internal serverr error",
                error:err.message
            })
        })
     }
}

updateStatus = (req,res) =>{
    let validationError = []
    if(!req.body._id)
    {
        validationError.push("Id is required")
    }
    if(!req.body.status){
        validationError.push("Status is required")
    }
    if(validationError.length > 0)
    {
        res.json({
            status:422,
            success:false,
            message:"Validation error occurs",
            error:validationError
        })
    }
    else{
       user.findOne({_id:req.body._id})
        .then((userData) =>{
            if(!userData)
            {
                res.json({
                    status:404,
                    success:false, 
                    message:"Data not found"
                })
            }
            else{
                if(req.body.status){
                   userData.status = req.body.status
                }
               userData.save()
                .then(
                    (resSave) =>{
                        res.json({
                            status:200,
                            success:true,
                            message:"Data Updated Successfully",
                            data:resSave
                        })
                    }
                )
                .catch(
                    (err) =>{
                        res.json({
                            status:500,
                            success:false,
                            message:"Internal server error",
                            errors:err.message
                        })
                    }
                )
            }
        })
        .catch(
            (err) =>{
                res.json({
                    status:500,
                    success:false,
                    message:"Internal server error",
                    errors:err.message
                })
            }
        )
    }
}
module.exports = {
    login,
    updateStatus
}