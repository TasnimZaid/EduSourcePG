const express = require('express') ;
const consultantAvailability = require('../controllers/consultantAvailability')
const router = express.Router() ;



router.post('/availability', consultantAvailability.addConsultantAvailability);
router.get('/availability/:consultantId', consultantAvailability.getConsultantAvailability);
router.patch('/availability/:id', consultantAvailability.editConsultantAvailability);
router.delete('/availability/:id', consultantAvailability.deleteConsultantAvailability);
router.get('/availability', consultantAvailability.getAllConsultantAvailability);



module.exports = router;