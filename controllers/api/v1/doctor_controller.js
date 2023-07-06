const Doctor = require("../../../models/doctor");
const jwt = require("jsonwebtoken");

// Register the Doctor in app
module.exports.register = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);

    return res.status(200).json({
      success: true,
      message: doctor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login the Doctor in the app
module.exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        succss: false,
        message: "No email or password",
      });
    }

    let doctor = await Doctor.findOne({ email: email });
    if (!doctor) {
      return res.status(301).json({
        success: false,
        message: "Invalid Username or Password!",
      });
    }

    // Check if Password matches and calling the bcrypt function in the doctor's Model
    const isMatch = await doctor.matchPassword(password);

    // Error Handling if Invalid password
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Username or Password",
      });
    }

    // Get JWT token
    const token = doctor.getSignedJwtToken();

    //Return Response
    res.status(200).json({
      success: true,
      token,
      message: `Log In Sucessfully! Keep the Token Safely ${doctor.username}!`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Error Occurred",
    });
  }
};
