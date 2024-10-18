
const express = require('express');
const router = express.Router();
const teacherConsultantController = require('../controllers/teacherConsultantController')
const knex = require('../knex-config');

router.get('/AllTeacher', teacherConsultantController.getAllTeacher );
router.get('/TeacherDetails/:id', teacherConsultantController.getTeacherDetails );
router.post('/consultation-requests' , teacherConsultantController.consultationRequests)
router.get('/consultant/:consultantId/requests', teacherConsultantController.consultatRrqProfile );
router.get('/teacher/:teacherId/requests', teacherConsultantController.teacherReqProfile );



// Endpoint to post a response
// router.post('/responses', async (req, res) => {
//     const { request_id, teacher_id, consultant_id, quiz_id, feedback } = req.body;

//     try {
//         // Insert the response into the database
//         const [response_id] = await knex('responses').insert({
//             request_id,
//             teacher_id,
//             consultant_id,
//             quiz_id,
//             feedback,
//             created_at: knex.fn.now(),
//             updated_at: knex.fn.now()
//         }).returning('id'); // Return the id of the new response

//         res.status(201).json({ message: 'Response created successfully', response_id });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Failed to create response', error: error.message });
//     }
// });


// Endpoint to post a response
router.post('/responses', async (req, res) => {
    const { 
        request_id, 
        teacher_id, 
        consultant_id, 
        quiz_id, 
        feedback, 
        url, 
        text, 
        img, 
        description 
    } = req.body;

    try {
        // Validate that only one of quiz_id or exam_id is provided
        if (quiz_id ) {
            return res.status(400).json({ message: 'You can only provide either quiz_id or exam_id, not both.' });
        }

        // Insert the response into the database
        const [response_id] = await knex('responses').insert({
            request_id,
            teacher_id,
            consultant_id: consultant_id || null,
            quiz_id: quiz_id || null, 
            feedback,
            url: url || null, 
            text: text || null, 
            img: img || null,
            description: description || null, 
            created_at: knex.fn.now(),
            updated_at: knex.fn.now()
        }).returning('id'); 

        // After inserting the response, update the is_completed field in consultation_requests
        await knex('consultation_requests')
            .where({ id: request_id })
            .update({ is_completed: true, updated_at: knex.fn.now() });

        // Send success response with the new response id
        res.status(201).json({ message: 'Response created successfully and consultation request marked as completed', response_id });
    } catch (error) {
        console.error('Error creating response or updating consultation request:', error);
        res.status(500).json({ message: 'Failed to create response or update consultation request', error: error.message });
    }
});





module.exports = router;
