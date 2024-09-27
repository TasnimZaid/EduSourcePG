const knex = require('../knex-config');

// Create a new class
exports.createClass = async (req, res, next) => {
    const { name, teacher_id } = req.body;

    try {
        const classId = await knex('classes').insert({ name, teacher_id });
        res.status(201).json({ message: 'Class created successfully', classId });
    } catch (error) {
        next(error); 
    }
};


// Add a student to a class
exports.addStudentToClass = async (req, res, next) => {
    const { class_id, student_id } = req.body;

    try {
        const id = await knex('class_students').insert({ class_id, student_id });
        res.status(201).json({ message: 'Student added to class', id });
    } catch (error) {
        next(error); 
    }
};

// get the calss by id of teacher teacher profile

exports.getTeacherClasses = async (req, res, next) => {
    const { teacher_id  } = req.params;

    try {
        const classes = await knex('classes').where({ teacher_id });
        res.status(200).json(classes);
    } catch (error) {
        next(error); // Pass error to the error-handling middleware
    }
};


// Get class students by teacher ID
exports.getClassStudentsByTeacherId = async (req, res, next) => {
    const { teacherId } = req.params;

    try {
        const result = await knex('class_students')
            .join('classes', 'class_students.class_id', '=', 'classes.id')
            .join('teacher', 'classes.teacher_id', '=', 'teacher.id')
            .join('student', 'class_students.student_id', '=', 'student.id')
            .select(
                'class_students.id as class_student_id',
                'classes.name as class_name',
                'student.name as student_name',
                'teacher.name as teacher_name',
                'teacher.id as teacher_id'
            )
            .where('teacher.id', teacherId);

        if (result.length === 0) {
            return res.status(404).json({ message: 'No students found for this teacher.' });
        }

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};


// add a quiz to a class 
exports.addQuizToClass = async(req , res , next)=>{
    const {class_id , quiz_id} = req.body;

    try{
        const id = await knex('class_quizzes').insert({class_id , quiz_id});
        res.status(201).json({message : 'quiz added to class successfully' , id}) ;

    }catch(error){
        next(error)
    }
}





// Fetch quizzes for teacher profile
const getClassQuizzesForTeacher = async (teacherId) => {
    return knex('quizzes')
      .join('class_quizzes', 'quizzes.id', 'class_quizzes.quiz_id')
      .join('classes', 'class_quizzes.class_id', 'classes.id')
      .where('classes.teacher_id', teacherId)
      .select(
        'quizzes.id as quiz_id',
        'quizzes.title',
        'quizzes.quiz_img',
        'quizzes.grade',
        'quizzes.subject',
        'classes.name as class_name',
        'class_quizzes.created_at as assigned_date'
      );
  };
  


// Controller for fetching teacher quizzes
exports.getTeacherQuizzes = async (req, res) => {
    const { teacherId } = req.params;
    
    try {
      const quizzes = await getClassQuizzesForTeacher(teacherId);
      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch quizzes for teacher' });
    }
  };
  
// Controller for fetching student quizzes with teacher info
exports.getStudentQuizzes = async (req, res) => {
    const { studentId } = req.params;
  
    try {
      // Query to get quizzes for the student along with teacher information
      const quizzes = await knex('quizzes')
        .join('class_quizzes', 'quizzes.id', 'class_quizzes.quiz_id')
        .join('classes', 'class_quizzes.class_id', 'classes.id') // Join classes to get teacher_id
        .join('teacher', 'classes.teacher_id', 'teacher.id') // Join teachers to get teacher info
        .join('class_students', 'class_quizzes.class_id', 'class_students.class_id') // Join class_students to filter by student
        .where('class_students.student_id', studentId)
        .select(
          'quizzes.id as quizId',
          'quizzes.title',
          'quizzes.quiz_img',
          'quizzes.grade',
          'quizzes.subject',
          'teacher.id as teacherId', // Teacher information
          'teacher.name as teacherName',
          'teacher.email as teacherEmail'
        );
  
      // Return quizzes with teacher information in JSON format
      res.json(quizzes);
    } catch (error) {
      // Handle any errors that may occur
      res.status(500).json({ error: error});
    }
  };
  