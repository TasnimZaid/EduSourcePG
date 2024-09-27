const express = require('express');
const quizzezController = require('../controllers/quizzezController');
const router = express.Router();
const knex = require('../knex-config');

// Update your route in the quizzezRoute file
router.get('/getAllQuizz', async (req, res) => {
    const quizzes = await quizzezController.getAllQuizzesWithQuestions();
    res.status(200).json(quizzes);
});

// Route to get a specific quiz by ID
router.get('/quizz/:id', async (req, res) => {
    const quizId = req.params.id;
    const quiz = await quizzezController.getQuizById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.json(quiz);
 
});

// to get material 
router.get('/getMaterials', quizzezController.getMaterials);
// Route for inserting a quiz
router.post('/quizzes', quizzezController.createQuiz);
// Route for inserting a question
router.post('/questions', quizzezController.createQuestion);




module.exports = router;
