const express = require('express');
const router = express.Router();

const DoctorController=require('../../../controllers/API/V1/doctors');  //doctorss...

router.post("/register", DoctorController.register);
router.post("/login", DoctorController.login);

module.exports = router;