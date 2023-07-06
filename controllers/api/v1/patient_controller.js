const Patient = require("../../../models/patient");
const Report = require("../../../models/report");

module.exports.register = async (req, res) => {
  // Getting the Doctor ID
  const doctor = req.doctor._id;

  try {
    const { name, phone } = req.body;
    let patient;
    patient = await Patient.find({
      phone,
    });

    // if there is patient success if not then create
    if (patient.length > 0) {
      return res.status(200).json({
        success: true,
        data: patient[0],
        message: "Patient's phone number already registered",
      });
    }

    patient = await Patient.create({
      name,
      phone,
      doctor,
    });

    // Return Response
    return res.status(201).json({
      success: true,
      data: patient,
      message: "Patient Registered Successfully!",
    });
  } catch (error) {
    // Error Handling
    return res.status(401).json({
      success: false,
      message: "Error Occured",
    });
  }
};
