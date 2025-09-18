const penalty = require("./penaltyModel")

//add
add = (req, res) => {
    let validationError = []

    if (!req.body.ownerId) {
        validationError.push("owner id is required")
    }
    if (!req.body.vehicleId) {
        validationError.push("vehicle id is required")
    }
    if (!req.body.customerId) {
        validationError.push("customer id is required")
    }
    if (!req.body.rentalId) {
        validationError.push("rental id is required")
    }
    if (!req.body.customerId) {
        validationError.push("customer id is required")
    }
    if (!req.body.penaltyAmount) {
        validationError.push("penalty Amount is required")
    }
    if (!req.body.penaltyType) {
        validationError.push("penalty type is required")
    }
    if (!req.body.penaltyDescription) {
        validationError.push("penalty description is required")
    }
    if (!req.body.issuedDate) {
        validationError.push("issued date is required")
    }
    if (!req.body.dueDate) {
        validationError.push("due date is required")
    }

    if (validationError.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "More Than One Penalty is Not Applicable",
            error: validationError        
        })
    }
    else {
        penalty.findOne({ rentalId: req.body.rentalId })
            .then((penaltyData) => {
                if (!penaltyData) {
                    let penObj = new penalty();
                    penObj.customerId = req.body.customerId
                    penObj.vehicleId = req.body.vehicleId
                    penObj.ownerId = req.body.ownerId
                    penObj.rentalId = req.body.rentalId
                    penObj.penaltyAmount = req.body.penaltyAmount
                    penObj.penaltyType = req.body.penaltyType
                    penObj.penaltyDescription = req.body.penaltyDescription

                    penObj.issuedDate = req.body.issuedDate
                    penObj.dueDate = req.body.dueDate

                    penObj.save()
                        .then(
                            (resSave) => {
                                res.json({
                                    status: 200,
                                    success: true,
                                    message: "data added successfully",
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
                else {
                    res.json({
                        status: 422,
                        success: false,
                        message: "data already exists",
                        data: penaltyData
                    })
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

//getall

getall = async (req, res) => {
    const totalCount = await penalty.countDocuments(req.body).exec()
    penalty.find(req.body).populate("ownerId").populate("customerId").populate("vehicleId").populate("penaltyType")
        .then((penaltyData) => {
            res.json({
                status: 200,
                success: false,
                message: "Data loaded successfully",
                data: penaltyData,
                count: totalCount
            })
        })
        .catch((err) => {
            res.json({
                status: 500,
                success: false,
                message: "Internal server error",
                errors: err.message
            })
        })
}

//get single
getsingle = (req, res) => {
    const validationError = []
    if (!req.body._id) {
        validationError.push("id is required")
    }
    if (validationError.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "validation error occurs",
            error: validationError
        })
    }
    else {
        penalty.findOne({ _id: req.body._id })
            .then((penaltydata) => {
                if (!penaltydata) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Data not found"
                    })
                }
                else {
                    res.json({
                        status: 200,
                        success: true,
                        message: "Data loaded successfully",
                        data: penaltydata
                    })
                }
            })
            .catch((err) => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal serverv error",
                    errors: err.message
                })
            })
    }

}

//delete data

deleteData = (req, res) => {
    let validationError = []
    if (!req.body._id) {
        validationError.push("id is required")
    }
    if (validationError.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "valiadtion error occurs",
            error: validationError
        })
    }
    else {
        penalty.findOne({ _id: req.body._id })
            .then((penaltyData) => {
                if (!penaltyData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "data not found"
                    })
                }
                else {
                    penalty.deleteOne({ _id: req.body._id })
                        .then(() => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Data deleted successfully",
                                data: penaltyData
                            })
                        })
                        .catch(() => {
                            res.json({
                                status: 500,
                                success: false,
                                message: "Internal server Error",
                                errors: err.message
                            })
                        })
                }
            })
            .catch(() => {
                res.json({
                    status: 500,
                    success: false,
                    message: "Internal server Error",
                    errors: err.message
                })
            })
    }
}

//updateData

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
        penalty.findOne({ _id: req.body._id })
            .then((penaltyData) => {
                if (!penaltyData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Data not found"
                    })
                }
                else {
                    if (req.body.ownerId) {
                        penaltyData.ownerId = req.body.ownerId
                    }
                    if (req.body.vehicleId) {
                        penaltyData.vehicleId = req.body.vehicleId
                    }
                    if (req.body.customerId) {
                        penaltyData.customerId = req.body.customerId
                    }
                    if (req.body.rentalId) {
                        penaltyData.rentalId = req.body.rentalId
                    }
                    if (req.body.penaltyAmount) {
                        penaltyData.penaltyAmount = req.body.penaltyAmount
                    }
                    if (req.body.penaltyType) {
                        penaltyData.penaltyType = req.body.penaltyType
                    }
                    if (req.body.penaltyDescription) {
                        penaltyData.penaltyDescription = req.body.penaltyDescription
                    }
                    if (req.body.issuedDate) {
                        penaltyData.issuedDate = req.body.issuedDate
                    }
                    if (req.body.dueDate) {
                        penaltyData.dueDate = req.body.dueDate
                    }
                    penaltyData.save()
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
       penalty.findOne({_id:req.body._id})
        .then((penaltyData) =>{
            if(!penaltyData)
            {
                res.json({
                    status:404,
                    success:false, 
                    message:"Data not found"
                })
            }
            else{
                if(req.body.status){
                   penaltyData.status = req.body.status
                }
               penaltyData.save()
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

updatePaymentStatus = (req,res) =>{
    let validationError = []
    if(!req.body._id)
    {
        validationError.push("id is required")
    }
    if(!req.body.paymentStatus){
        validationError.push(" payment status is required")
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
       penalty.findOne({_id:req.body._id})
        .then((penaltyData) =>{
            if(!penaltyData)
            {
                res.json({
                    status:404,
                    success:false, 
                    message:"Data not found"
                })
            }
            else{
                if(req.body.paymentStatus){
                   penaltyData.paymentStatus = req.body.paymentStatus
                }
               penaltyData.save()
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
    add,
    getall,
    getsingle,
    deleteData,
    updateData,
    updateStatus,
    updatePaymentStatus
}
