
const express = require('express');
const router = express.Router();
const teacherConsultantController = require('../controllers/teacherConsultantController')

router.get('/AllTeacher', teacherConsultantController.getAllTeacher );

module.exports = router;
