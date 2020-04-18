const express = require('express');
const router = express.Router();

const reportController=require('../../../controllers/API/V1/reports');  //reports...

router.get("/:status", reportController.status);

module.exports = router;