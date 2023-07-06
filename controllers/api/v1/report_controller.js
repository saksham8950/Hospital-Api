const Patient = require("../../../models/patient");
const Doctor = require("../../../models/doctor");
const Report = require("../../../models/report");

module.exports.create_report = async (req, res) => {
  const doctor = req.doctor._id;
  // console.log("Dr: " + doctor);

  try {
    if (!Report.schema.path("status").enumValues.includes(req.body.status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const report = Report.create({
      doctor: doctor,
      patient: req.params.id,
      status: req.body.status,
    });

    return res.status(200).json({
      success: true,
      message: "Report created",
    });
  } catch (error) {
    // Error Handling
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

//Find the patient with id and send report
module.exports.all_reports = async (req, res) => {
  try {
    const reports = Report.find({
      patient: req.params.id,
    });
    reports
      .exec()
      .then((report) => {
        return res.send(report);
      })
      .catch((error) => {
        return res.status(401).json({
          success: false,
          message: error.message,
        });
      });
  } catch (error) {
    // Error Handling
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

// Send by Status
module.exports.report_by_status = async (req, res) => {
  try {
    const reports = Report.find({ status: req.params.status });
    reports
      .exec()
      .then((rep) => {
        return res.send(rep);
      })
      .catch((err) => {
        return res.status(500).json({
          message: err.message,
        });
      });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
