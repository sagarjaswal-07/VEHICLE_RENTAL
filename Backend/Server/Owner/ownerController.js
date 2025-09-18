const owner = require("./ownerModel")
const user = require("../User/userModel")
const roundValue = 10;
const bcrypt = require("bcrypt")

register = (req,res) =>{
    valiadtionError = [];
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
    if(!req.body.address){
        valiadtionError.push("Address is required")
    }
    if(!req.body.zipCode){
        valiadtionError.push("zip code is required")
    }
    if(!req.file){
        valiadtionError.push("owner image is required")
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
            useObj.userType = 2
            useObj.save()
            .then(
                (userRes) =>{
                let ownObj = new owner()
                ownObj.name = req.body.name
                ownObj.email = req.body.email
                ownObj.password = req.body.password
                ownObj.contact = req.body.contact
                ownObj.address = req.body.address
                ownObj.zipCode = req.body.zipCode
                ownObj.ownerImage = req.file.path
                ownObj.userId = userRes._id
                ownObj.save()
                .then((coRes) =>{
                   useObj.ownerId = coRes._id
                   useObj.save()
                   .then(() =>{
                     res.json({
                        status:200,
                        success:true,
                        message:"owner registered Successfully",
                        data:coRes
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
    const totalCount = await owner.countDocuments().exec()
    owner.find()
    .then((ownerData) =>{
        res.json({
            status:200,
            success:true,
            message:"Data loaded successfully",
            data:ownerData,
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

updateStatus = (req,res) =>{
    let validationError = []
    if(!req.body._id)
    {
        validationError.push("id is required")
    }
    if(!req.body.status){
        validationError.push("status is required")
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
       owner.findOne({_id:req.body._id})
        .then((ownerData) =>{
            if(!ownerData)
            {
                res.json({
                    status:404,
                    success:false, 
                    message:"Data not found"
                })
            }
            else{
                if(req.body.status){
                   ownerData.status = req.body.status
                }
               ownerData.save()
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

getsingle = (req,res) =>{
    const validationError = []
    if(!req.body._id){
        validationError.push("id is required")
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
        owner.findOne({_id:req.body._id})
        .then((ownerData) =>{
            if(!ownerData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found"
                })
            }
            else{
                res.json({
                    status:200,
                    success:true,
                    message:"Data loaded successfully",
                    data:ownerData
                })
            }
        })
        .catch((err) =>{
            res.json({
                status:500,
                success:false,
                message:"Internal serverv error",
                errors:err.message
            })
        })
    }

}

//updatData
updateData = (req, res) => {
    let validationError = []
    if (!req.body._id) {
        validationError.push("id is required")
    }
    if (validationError.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "Validation error occurs",
            error: validationError
        })
    }
    else {
        owner.findOne({ _id: req.body._id })
            .then((ownerData) => {
                if (!ownerData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Data not found"
                    })
                }
                else {
                    if (req.body.name) {
                        ownerData.name = req.body.name
                    }
                    if (req.body.contact) {
                        ownerData.contact = req.body.contact
                    }
                    if (req.body.address) {
                        ownerData.address = req.body.address
                    }
                   
                    if (req.body.zipCode) {
                        ownerData.zipCode = req.body.zipCode
                    }
                    if (req.file) {
                        ownerData.ownerImage =  req.file.path
                    }
                   
                    ownerData.save()
                        .then(
                            (resSave) => {
                                res.json({
                                    status: 200,
                                    success: true,
                                    message: "Data Updated Successfully",
                                    data: resSave
                                })
                            }
                        )
                        .catch(
                            (err) => {
                                res.json({
                                    status: 500,
                                    success: false,
                                    message: "Internal server error",
                                    errors: err.message
                                })
                            }
                        )
                }
            })
            .catch(
                (err) => {
                    res.json({
                        status: 500,
                        success: false,
                        message: "Internal server error",
                        errors: err.message
                    })
                }
            )
    }
}

module.exports ={
    register,
    getall,
    getsingle,
    updateStatus,
    updateData
}