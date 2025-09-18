const Router = require("express").Router();
const multer = require("multer");

//for storing pictures on cloud
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const categoryController = require("../Server/Category/categoryController");
const penaltyController = require("../Server/Penalty System/penaltyController");
const customerController = require("../Server/Customer/customerController");
const ownerController = require("../Server/Owner/ownerController");
const userController = require("../Server/User/userContoller");
const vehicleController = require("../Server/Vehicle/vehicleController");
const vehiclAvailabilityController = require("../Server/vehicleAvailability/vehicleAvailabilityController");
const rentingController = require("../Server/Renting/rentingController");
const queryController = require("../Server/Query/queryController");
const penaltyRulesController = require("../Server/penaltyRules/penalyRulesController");

//category cloudinary
const categoryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "category",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const categoryUpload = multer({ storage: categoryStorage });

Router.post(
  "/category/add",
  categoryUpload.single("categoryImage"),
  categoryController.add
);
Router.post("/category/getall", categoryController.getall);
Router.post("/category/getsingle", categoryController.getsingle);
Router.post("/category/delete", categoryController.deleteData);
Router.post(
  "/category/update",
  categoryUpload.single("categoryImage"),
  categoryController.updateData
);

// for storing pictures on local storage
// //category multer
// const categoryStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './Public/category')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
//   })

//   const categoryUpload = multer({ storage: categoryStorage })

//vehicle cloudinary
const vehicleStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "vehicle",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const vehicleUpload = multer({ storage: vehicleStorage });

//vehicle routes
Router.post(
  "/vehicle/add",
  vehicleUpload.single("vehicleImage"),
  vehicleController.add
);
Router.post("/vehicle/getall", vehicleController.getall);
Router.post("/vehicle/getsingle", vehicleController.getsingle);
Router.post("/vehicle/delete", vehicleController.deleteData);
Router.post(
  "/vehicle/update",
  vehicleUpload.single("vehicleImage"),
  vehicleController.updateData
);
Router.post("/vehicle/updatestatus", vehicleController.updateStatus);

//vehicle availability
Router.post("/availability/add", vehiclAvailabilityController.add);
Router.post("/availability/getall", vehiclAvailabilityController.getall);
Router.post("/availability/getsingle", vehiclAvailabilityController.getsingle);
Router.post("/availability/delete", vehiclAvailabilityController.deleteData);
Router.post("/availability/update", vehiclAvailabilityController.updateData);

//renting

Router.post("/renting/add", rentingController.add);
Router.post("/renting/getall", rentingController.getall);
Router.post("/renting/getsingle", rentingController.getsingle);
Router.post("/renting/delete", rentingController.deleteData);
Router.post("/renting/update", rentingController.updateData);
Router.post("/renting/updatestatus", rentingController.updateStatus);

//Queries

Router.post("/query/add", queryController.add);
Router.post("/query/getall", queryController.getall);

//penalty Rules
Router.post("/penaltyrules/add", penaltyRulesController.add);
Router.post("/penaltyrules/getall", penaltyRulesController.getall);
Router.post("/penaltyrules/delete", penaltyRulesController.deleteData);
Router.post("/penaltyrules/getsingle", penaltyRulesController.getsingle);
Router.post("/penaltyrules/update", penaltyRulesController.updateData);

//penalty

Router.post("/penalty/add", penaltyController.add);
Router.post("/penalty/getall", penaltyController.getall);
Router.post("/penalty/getsingle", penaltyController.getsingle);
Router.post("/penalty/delete", penaltyController.deleteData);
Router.post("/penalty/update", penaltyController.updateData);
Router.post("/penalty/updatestatus", penaltyController.updateStatus);
Router.post(
  "/penalty/updatepaymentstatus",
  penaltyController.updatePaymentStatus
);

//customer register
Router.post("/customer/register", customerController.register);
Router.post("/customer/getall", customerController.getall);

//owner cloudinary
const ownerStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "owner",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const ownerUpload = multer({ storage: ownerStorage });

//owner register
Router.post(
  "/owner/register",
  ownerUpload.single("ownerImage"),
  ownerController.register
);
Router.post("/owner/getall", ownerController.getall);
Router.post("/owner/updatestatus", ownerController.updateStatus);
Router.post("/owner/getsingle", ownerController.getsingle);
Router.post(
  "/owner/update",
  ownerUpload.single("ownerImage"),
  ownerController.updateData
);

//login //user
Router.post("/user/login", userController.login);
Router.post("/user/updatestatus", userController.updateStatus);

Router.use(require("../Config/middleware"));

module.exports = Router;
