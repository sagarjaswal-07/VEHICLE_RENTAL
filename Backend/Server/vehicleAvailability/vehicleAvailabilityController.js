const vehicleAvailable = require("./vehicleAvailabilityModel");

add = (req, res) => {
  let validationError = [];

  if (!req.body.ownerId) {
    validationError.push("owner id is required");
  }
  if (!req.body.vehicleId) {
    validationError.push("vehicle id is required");
  }
  if (!req.body.weekStartDate) {
    validationError.push("week start date is required");
  }
  if (!req.body.weekEndDate) {
    validationError.push("week end date is required");
  }
  if (!req.body.monday) {
    validationError.push("moday availability is required");
  }
  if (!req.body.tuesday) {
    validationError.push("tuesday availability is required");
  }
  if (!req.body.wednesday) {
    validationError.push("wednesday availability is required");
  }
  if (!req.body.thursday) {
    validationError.push("thursday availability is required");
  }
  if (!req.body.friday) {
    validationError.push("friday availability is required");
  }
  if (!req.body.saturday) {
    validationError.push("saturday availability is required");
  }
  if (!req.body.sunday) {
    validationError.push("sunday availability is required");
  }
  if (validationError.length > 0) {
    res.json({
      status: 422,
      success: false,
      message: "validation error occurrs",
      error: validationError,
    });
  } else {
    vehicleAvailable
      .findOne({ vehicleId: req.body.vehicleId })
      .then((vehicleAvailableData) => {
        if (!vehicleAvailableData) {
          let vehAvlObj = new vehicleAvailable();
          vehAvlObj.ownerId = req.body.ownerId;
          vehAvlObj.vehicleId = req.body.vehicleId;
          vehAvlObj.weekStartDate = req.body.weekStartDate;
          vehAvlObj.weekEndDate = req.body.weekEndDate;
          vehAvlObj.monday = req.body.monday;
          vehAvlObj.tuesday = req.body.tuesday;
          vehAvlObj.wednesday = req.body.wednesday;
          vehAvlObj.thursday = req.body.thursday;
          vehAvlObj.friday = req.body.friday;
          vehAvlObj.saturday = req.body.saturday;
          vehAvlObj.sunday = req.body.sunday;
          vehAvlObj
            .save()
            .then((resSave) => {
              res.json({
                status: 200,
                success: true,
                message: "data added successfully",
                data: resSave,
              });
            })
            .catch((err) => {
              res.json({
                status: 500,
                success: false,
                message: "Internal server error",
                errors: err.message,
              });
            });
        } else {
          res.json({
            status: 422,
            success: false,
            message: "data already exists",
            data: vehicleAvailableData,
          });
        }
      })
      .catch((err) => {
        res.json({
          status: 500,
          success: false,
          message: "Internal server error",
          errors: err.message,
        });
      });
  }
};

//getall

getall = async (req, res) => {
  const totalCount = await vehicleAvailable.countDocuments(req.body).exec();
  vehicleAvailable
    .find(req.body)
    .populate("ownerId")
    .populate("vehicleId")
    .then((vehicleAvailableData) => {
      res.json({
        status: 200,
        success: true,
        message: "Data loaded successfully",
        data: vehicleAvailableData,
        count: totalCount,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        success: false,
        message: "Internal server error",
        errors: err.message,
      });
    });
};

getsingle = (req, res) => {
  const validationError = [];
  if (!req.body._id) {
    validationError.push("id is required");
  }
  if (validationError.length > 0) {
    res.json({
      status: 422,
      success: false,
      message: "validation error occurs",
      error: validationError,
    });
  } else {
    vehicleAvailable
      .findOne({ _id: req.body._id })
      .then((vehicleData) => {
        if (!vehicleData) {
          res.json({
            status: 404,
            success: false,
            message: "Data not found",
          });
        } else {
          res.json({
            status: 200,
            success: true,
            message: "Data loaded successfully",
            data: vehicleData,
          });
        }
      })
      .catch((err) => {
        res.json({
          status: 500,
          success: false,
          message: "Internal serverv error",
          errors: err.message,
        });
      });
  }
};

//delete data

deleteData = (req, res) => {
  let validationError = [];
  if (!req.body._id) {
    validationError.push("id is required");
  }
  if (validationError.length > 0) {
    res.json({
      status: 422,
      success: false,
      message: "valiadtion error occurs",
      error: validationError,
    });
  } else {
    vehicleAvailable
      .findOne({ _id: req.body._id })
      .then((vehicleAvailableData) => {
        if (!vehicleAvailableData) {
          res.json({
            status: 404,
            success: false,
            message: "data not found",
          });
        } else {
          vehicleAvailable
            .deleteOne({ _id: req.body._id })
            .then(() => {
              res.json({
                status: 200,
                success: true,
                message: "Data deleted successfully",
                data: vehicleAvailableData,
              });
            })
            .catch(() => {
              res.json({
                status: 500,
                success: false,
                message: "Internal server Error",
                errors: err.message,
              });
            });
        }
      })
      .catch(() => {
        res.json({
          status: 500,
          success: false,
          message: "Internal server Error",
          errors: err.message,
        });
      });
  }
};

//update data
updateData = (req, res) => {
  let validationError = [];
  if (!req.body._id) {
    validationError.push("id is required");
  }
  if (validationError.length > 0) {
    res.json({
      status: 422,
      success: false,
      message: "Validation error occurs",
      error: validationError,
    });
  } else {
    vehicleAvailable
      .findOne({ _id: req.body._id })
      .then((vehicleAvailableData) => {
        if (!vehicleAvailableData) {
          res.json({
            status: 404,
            success: false,
            message: "Data not found",
          });
        } else {
          if (req.body.ownerId) {
            vehicleAvailableData.ownerId = req.body.ownerId;
          }
          if (req.body.vehicleId) {
            vehicleAvailableData.vehicleId = req.body.vehicleId;
          }
          if (req.body.weekStartDate) {
            vehicleAvailableData.weekStartDate = req.body.weekStartDate;
          }
          if (req.body.weekEndDate) {
            vehicleAvailableData.weekEndDate = req.body.weekEndDate;
          }
          if (req.body.monday) {
            vehicleAvailableData.monday = req.body.monday;
          }
          if (req.body.tuesday) {
            vehicleAvailableData.tuesday = req.body.tuesday;
          }
          if (req.body.wednesday) {
            vehicleAvailableData.wednesday = req.body.wednesday;
          }
          if (req.body.thursday) {
            vehicleAvailableData.thursday = req.body.thursday;
          }
          if (req.body.friday) {
            vehicleAvailableData.friday = req.body.friday;
          }
          if (req.body.saturday) {
            vehicleAvailableData.saturday = req.body.saturday;
          }
          if (req.body.sunday) {
            vehicleAvailableData.sunday = req.body.sunday;
          }

          vehicleAvailableData
            .save()
            .then((resSave) => {
              res.json({
                status: 200,
                success: true,
                message: "Data Updated Successfully",
                data: resSave,
              });
            })
            .catch((err) => {
              res.json({
                status: 500,
                success: false,
                message: "Internal server error",
                errors: err.message,
              });
            });
        }
      })
      .catch((err) => {
        res.json({
          status: 500,
          success: false,
          message: "Internal server error",
          errors: err.message,
        });
      });
  }
};

module.exports = {
  add,
  getall,
  getsingle,
  deleteData,
  updateData,
};
