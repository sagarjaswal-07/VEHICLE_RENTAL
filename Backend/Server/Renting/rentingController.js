
const renting = require("./rentingModel")
const twilio = require("twilio");

add = (req,res) =>{
    let validationError = []

    if(!req.body.ownerId){
        validationError.push("owner id is required")
    }
    if(!req.body.vehicleId){
        validationError.push("vehicle id is required")
    }
    if(!req.body.customerId){
        validationError.push("customer id is required")
    }
    if(!req.body.startDate){
        validationError.push("start date is required")
    }
    if(!req.body.endDate){
        validationError.push("end date is required")

    }
    if(!req.body.specialRequest){
        validationError.push("total price is required")
    }
    if(!req.body.totalPrice){
        validationError.push("total price is required")
    }
    if(!req.body.pickupLocation){
        validationError.push("pickup location is required")
    }
    if(!req.body.dropLocation){
        validationError.push("drop location is required")
    }
    
    if(validationError.length > 0){
        res.json({
            status:422,
            success:false,
            message:"validation error occurrs",
            error:validationError
        })
    }
    else{
        renting.findOne({satrtDate:req.body.startDate})
        .then((rentingData) =>{
            if(!rentingData)
            {
                let rentObj = new renting();
                rentObj.ownerId = req.body.ownerId
                rentObj.vehicleId = req.body.vehicleId
                rentObj.customerId = req.body.customerId
                rentObj.startDate = req.body.startDate
                rentObj.endDate = req.body.endDate
                rentObj.days = req.body.days
                rentObj.totalPrice= req.body.totalPrice
                rentObj.specialRequest= req.body.specialRequest
                rentObj.pickupLocation= req.body.pickupLocation
                rentObj.dropLocation= req.body.dropLocation
                rentObj.save()
                .then(
                   (resSave) =>{
                    res.json({
                        status:200, 
                        success:true,
                        message:"Request sent successfully",
                        data: resSave
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
            else{
                res.json({
                    status:422,
                    success:false,
                    message:"data already exists",
                    data:rentingData
                })
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

//getall

getall = async (req, res) => {
    const totalCount = await renting.countDocuments(req.body).exec()
    renting.find(req.body).populate("customerId").populate("ownerId").populate("vehicleId")
        .then((rentingData) => {
            res.json({
                status: 200,
                success: false,
                message: "Data loaded successfully",
                data: rentingData,
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
        renting.findOne({ _id: req.body._id })
            .then((rentingdata) => {
                if (!rentingdata) {
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
                        data: rentingdata
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

deleteData = (req,res) =>{
    let validationError = []
    if(!req.body._id){
        validationError.push("id is required")
    }
    if(validationError.length > 0){
        res.json({
            status:422,
            success:false,
            message:"valiadtion error occurs",
            error:validationError
        })
    }
    else{
        renting.findOne({_id:req.body._id})
        .then((rentingData) =>{
            if(!rentingData){
                res.json({
                    status:404,
                    success:false,
                    message:"data not found"
                })
            }
            else{
                renting.deleteOne({_id:req.body._id})
                .then(() =>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Data deleted successfully",
                        data:rentingData
                    })
                })
                .catch(() =>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server Error",
                        errors:err.message
                    })
                })
            }
        })
        .catch(() =>{
            res.json({
                status:500,
                success:false,
                message:"Internal server Error",
                errors:err.message
            })
        })
    }
}

//update data
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
       renting.findOne({_id:req.body._id})
            .then((rentingData) => {
                if (!rentingData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Data not found"
                    })
                }
                else {
                    if (req.body.ownerId) {
                        rentingData.ownerId = req.body.ownerId
                    }
                    if (req.body.vehicleId) {
                        rentingData.vehicleId = req.body.vehicleId
                    }
                    if (req.body.customerId) {
                        rentingData.customerId = req.body.customerId
                    }
                    if (req.body.endDate) {
                        rentingData.endDate = req.body.endDate
                    }
                    if (req.body.endDate) {
                        rentingData.endDate = req.body.endDate
                    }
                    if (req.body.totalPrice) {
                        rentingData.totalPrice = req.body.totalPrice
                    }
                    if (req.body.specialRequest) {
                        rentingData.specialRequest = req.body.specialRequest
                    }
                    if (req.body.pickupLocation) {
                        rentingData.pickupLocation = req.body.pickupLocation
                    }
                    if (req.body.dropLocation) {
                        rentingData.dropLocation = req.body.dropLocation
                    }
                    
                   
                    rentingData.save()
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

// Twilio Credentials
const ACCOUNT_SID = process.env.ACCOUNT_SID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

// Function to send SMS notification
const sendSMSNotification = (contact, rentingId, status) => {
    const messageBody = `Your renting (ID: ${rentingId}) status has been updated to: ${status}`;

    client.messages.create({
        body: messageBody,
        from: TWILIO_PHONE_NUMBER,
        to: contact
    })
    .then((message) => console.log("SMS sent:", message.sid))
    .catch((error) => console.error("SMS Error:", error));
};

const updateStatus = (req, res) => {
    if (!req.body._id) {
        return res.status(400).send({
            success: false,
            status: 400,
            message: "Validation Error: _id is required"
        });
    }

    renting.findOne({ _id: req.body._id })
        .populate("customerId") // customerId should include `contact`
        .populate("vehicleId")
        .exec()
        .then((result) => {
            if (!result) {
                return res.status(404).send({
                    success: false,
                    status: 404,
                    message: "Renting does not exist"
                });
            }

            if (!!req.body.status) {
                result.status = req.body.status;
            }

            result.save()
                .then((updatedData) => {
                    let rawContact = result.customerId?.contact;

                    if (rawContact) {
                        // Add +91 if it's not already present
                        let formattedContact = rawContact.startsWith("+91") ? rawContact : `+91${rawContact}`;

                        sendSMSNotification(formattedContact, result._id, result.status);
                    } else {
                        console.log("Phone number not found, skipping SMS.");
                    }

                    res.send({
                        success: true,
                        status: 200,
                        message: "Data Updated & SMS Sent",
                        data: updatedData
                    });
                })
                .catch((err) => {
                    res.status(500).send({
                        success: false,
                        status: 500,
                        message: err.message
                    });
                });
        })
        .catch((err) => {
            res.status(500).send({
                success: false,
                status: 500,
                message: err.message
            });
        });
};


module.exports ={
    add,
    getall,
    getsingle,
    deleteData,
    updateData,
    updateStatus
}