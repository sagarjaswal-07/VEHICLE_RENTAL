
const vehicle = require("./vehicleModel")

add = (req, res) => {
    let validationError = []
    if (!req.body.vehicleName) {
        validationError.push("vehicle Name is required")
    }
    if (!req.body.ownerId) {
        validationError.push("owner id is required")
    }
    if (!req.body.categoryId) {
        validationError.push("category id is required")
    }
    if (!req.body.make) {
        validationError.push("manufacturer of vehicle is required")
    }
    if (!req.body.model) {
        validationError.push("model of vehicle is required")
    }
    if (!req.body.year) {
        validationError.push("year of manufacture of vehicle is required")
    }
   
    if (!req.body.plateNumber) {
        validationError.push("pate number of vehicle is required")
    }
    if (!req.body.feulType) {
        validationError.push("feul type of vehicle is required")
    }
    if (!req.body.mileage) {
        validationError.push("distance driven by vehicle is required")
    }
    if (!req.body.transmission) {
        validationError.push("transmission of vehicle is required")
    }
    if (!req.body.pricePerDay) {
        validationError.push("peice per day of vehicle is required")
    }
    if (!req.file) {
        validationError.push("vehicle  image is required")
    }

    if (validationError.length > 0) {
        res.json({
            status: 422,
            success: false,
            message: "validation error occurrs",
            error: validationError
        })
    }
    else {
        vehicle.findOne({ plateNumber: req.body.plateNumber })
            .then((vehicleData) => {
                if (!vehicleData) {
                    let vehObj = new vehicle();
                    vehObj.vehicleName = req.body.vehicleName
                    vehObj.ownerId = req.body.ownerId
                    vehObj.categoryId= req.body.categoryId
                    vehObj.make = req.body.make
                    vehObj.model = req.body.model
                    vehObj.year = req.body.year
                    
                    vehObj.plateNumber = req.body.plateNumber
                    vehObj.feulType = req.body.feulType
                    vehObj.mileage = req.body.mileage
                    vehObj.transmission = req.body.transmission
                    vehObj.pricePerDay = req.body.pricePerDay
                    vehObj.vehicleImage = req.file.path
                    vehObj.description = req.body.description
                    vehObj.save()
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
                        data: vehicleData
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
    const totalCount = await vehicle.countDocuments(req.body).exec()
    vehicle.find(req.body).populate("categoryId").populate("ownerId")
        .then((vehicleData) => {
            res.json({
                status: 200,
                success: false,
                message: "Data loaded successfully",
                data: vehicleData,
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
//getsingle

getsingle = (req, res) => {
  const { id } = req.body; // POST body se id le rahe hain
  const validationError = [];

  if (!id) {
    validationError.push("id is required");
  }

  if (validationError.length > 0) {
    return res.status(422).json({
      success: false,
      message: "Validation error occurs",
      error: validationError,
    });
  }

  vehicle
    .findOne({ _id: id })
    .then((vehicleData) => {
      if (!vehicleData) {
        return res.status(404).json({
          success: false,
          message: "Data not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Data loaded successfully",
        data: vehicleData,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        errors: err.message,
      });
    });
};


//delete
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
        vehicle.findOne({ _id: req.body._id })
            .then((vehicleData) => {
                if (!vehicleData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "data not found"
                    })
                }
                else {
                    vehicle.deleteOne({ _id: req.body._id })
                        .then(() => {
                            res.json({
                                status: 200,
                                success: true,
                                message: "Data deleted successfully",
                                data: vehicleData
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
       vehicle.findOne({_id:req.body._id})
            .then((vehicleData) => {
                if (!vehicleData) {
                    res.json({
                        status: 404,
                        success: false,
                        message: "Data not found"
                    })
                }
                else {
                    if (req.body.vehicleName) {
                        vehicleData.vehicleName = req.body.vehicleName
                    }
                    if (req.body.ownerId) {
                        vehicleData.ownerId = req.body.ownerId
                    }
                    if (req.body.categoryId) {
                        vehicleData.categoryId = req.body.categoryId
                    }
                    if (req.body.make) {
                        vehicleData.make = req.body.make
                    }
                    if (req.body.model) {
                        vehicleData.model = req.body.model
                    }
                    if (req.body.year) {
                        vehicleData.year = req.body.year
                    }
                    if (req.body.vehicleType) {
                        vehicleData.vehicleType = req.body.vehicleType
                    }
                    if (req.body.plateNumber) {
                        vehicleData.plateNumber = req.body.plateNumber
                    }
                    if (req.body.feulType) {
                        vehicleData.feulType = req.body.feulType
                    }
                    if (req.body.mileage) {
                        vehicleData.mileage = req.body.mileage
                    }
                    if (req.body.transmission) {
                        vehicleData.transmission = req.body.transmission
                    }
                    if (req.body.pricePerDay) {
                        vehicleData.pricePerDay = req.body.pricePerDay
                    }
                    if (req.file) {
                        vehicleData.vehicleImage = req.file.path
                    }
                    if (req.body.description) {
                        vehicleData.description = req.body.description
                    }
                    vehicleData.save()
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
    if(!req.body.available){
        validationError.push("availability is required")
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
       vehicle.findOne({_id:req.body._id})
        .then((vehicleData) =>{
            if(!vehicleData)
            {
                res.json({
                    status:404,
                    success:false, 
                    message:"Data not found"
                })
            }
            else{
                if(req.body.available){
                   vehicleData.available = req.body.available
                }
               vehicleData.save()
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
    updateStatus
}