const jwt = require("jsonwebtoken");
const Doctor = require("../model/doctor");

//  User log-in check and access authentication
exports.checkAuth = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    console.log("Token Error");
    return res.status(401).json({
      success: false,
      message: "access-> Unauthroized "
    });
  }

  try {
    const decoded = jwt.verify(token, 'secret');
    console.log(decoded);
    req.doctor = await Doctor.findById(decoded.id);
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      success: false,
      message: "access-> Unauthroized "
    });
  }
};