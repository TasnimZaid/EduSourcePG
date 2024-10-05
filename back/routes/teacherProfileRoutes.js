const express = require('express');
const router = express.Router();
const knex = require('../knex-config');
const teacherProfileController = require('../controllers/teacherProfileController');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); // specify the uploads directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + file.originalname.replace(/ /g, '_'); // replace spaces with underscores
        cb(null, uniqueSuffix); // save file with a unique name
    },
});

const upload = multer({ storage: storage });

// Route for handling image uploads
router.post('/teacherprofile/:id/image', upload.single('image'), async (req, res) => {
    const { id } = req.params;

    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const imagePath = req.file.path; // path to the uploaded file
        // Update the teacher's profile with the new image path
        await knex('teacher').where({ id }).update({ teacher_img: imagePath });

        res.json({ imagePath }); // respond with the image path
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Error uploading image' });
    }
});

// Get teacher profile
router.get('/teacherprofile/:id', teacherProfileController.getTeacherProfile);

// Update teacher profile
router.patch('/teacherprofile/:id', teacherProfileController.patchTeacherProfile);

// Update password
router.patch('/teacherprofile/:id/password', teacherProfileController.updatePassword);

module.exports = router;
