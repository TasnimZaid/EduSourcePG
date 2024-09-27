const express = require("express");
const cors = require("cors");
require("dotenv").config();
const knex = require("knex");
const knexConfig = require("./knexfile");
const db = knex(knexConfig.development);
const authRoutes = require('./routes/authRoutes')
const quizzezRoute = require('./routes/quizzezRoute')
const materialRoute = require('./routes/materialRoutes')
const savedQuizRoutes = require('./routes/savedQuizTeacherRoutes')
const classRoutes = require('./routes/classRoute')
const app = express();


// Middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/api' , authRoutes);
app.use('/api' , materialRoute)
app.use('/api' , quizzezRoute)
app.use('/api', savedQuizRoutes); 
app.use('/api', classRoutes);







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