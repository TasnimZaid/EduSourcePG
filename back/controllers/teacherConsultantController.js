const knex = require('../knex-config');


exports.getAllTeacher = async (req, res) => {
    try {
        const teachers = await knex('teacher').where({ role: 'consultant' });
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching teachers', error });
    }
};

