const express = require("express");

const router = express.Router();
const patientController = require("../../../controllers/api/v1/patient_controller");
const reportController = require("../../../controllers/api/v1/report_controller");
const { verifyToken } = require("../../../config/middleware");
const passport = require("passport");

router.post("/register", verifyToken, patientController.register);

//- /patients/:id/create_report
router.post("/:id/create_report", verifyToken, reportController.create_report); //Create report of the patient
router.get("/:id/all_reports", reportController.all_reports); // Find the reports of that patient and Send

module.exports = router;
