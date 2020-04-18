const express = require('express');
const router = express.Router();
const { checkAuth } = require("../../../middleware/auth");
const patientController=require('../../../controllers/API/V1/patients') //patients controller imported

router.post("/register", checkAuth, patientController.registerPatient);

// Can access this route only if doctor is logged in, id of logged-in Doctor is checked.
router.post("/:id/create_report", checkAuth, patientController.createReport);
router.get("/:id/all_reports", patientController.allReports);


module.exports = router;