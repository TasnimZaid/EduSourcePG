const express = require("express");
const cors = require("cors");
require("dotenv").config();
const knex = require("knex");
const knexConfig = require("./knexfile");
const db = knex(knexConfig.development);
const authRoutes = require('./routes/authRoutes')
const quizzezRoute = require('./routes/quizzezRoute')
const lessonRout = require('./routes/lessonRoute')
const materialRoute = require('./routes/materialRoutes')
const savedQuizRoutes = require('./routes/savedQuizTeacherRoutes')
const classRoutes = require('./routes/classRoute')
const authRoutsStudent = require('./routes/authRoutsStudent');
const studentMaterialRoutes = require('./routes/studentMaterialRoutes')
const tasksRouter = require('./routes/tasksRoutes')
const teacherProfileRoutes = require('./routes/teacherProfileRoutes')
const teacherConsultantRoutes = require('./routes/teacherConsultantRoutes')
const consultantAvailabilityRoute = require('./routes/consultantAvailabilityRoute')
const appointmentRoute = require('./routes/appointmentRoute')
const authAdmin = require('./routes/adminAuth')


const app = express();


// Middleware
app.use(cors());
app.use(express.json());

const path = require("path");
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 


//routes
app.use('/api' , authRoutes);
app.use('/api' , materialRoute)
app.use('/api' , quizzezRoute)
app.use('/api', savedQuizRoutes); 
app.use('/api' , lessonRout )
app.use('/api', classRoutes);
app.use('/api', authRoutsStudent);
app.use('/api', studentMaterialRoutes);
app.use('/api', tasksRouter);
app.use('/api', teacherProfileRoutes);
app.use('/api', teacherConsultantRoutes);
app.use('/api' ,consultantAvailabilityRoute)
app.use('/api' , appointmentRoute)
app.use('/api/admin' , authAdmin)












app.get('/users', async (req, res) => {
    try {
      const users = await db('user').select('*'); // Get all user records
      res.status(200).json(users); // Send the data as JSON response
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching users' });
    }
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});