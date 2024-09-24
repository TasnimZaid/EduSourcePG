exports.up = function(knex) {
    return knex.schema
        // Create quizzes table
        .createTable('quizzes', function(table) {
            table.increments('id').primary();
            table.string('title').notNullable(); // Quiz title
            table.string('quiz_img').nullable(); // Optional quiz image
            table.integer('teacher_id').unsigned().notNullable()
                .references('id').inTable('teacher') // Reference to teacher
                .onDelete('CASCADE');
            table.enu('subject', [
                'Math', 
                'Science', 
                'English', 
                'History', 
                'Geography', 
                'Physics', 
                'Chemistry', 
                'Music', 
                'Philosophy',
                'Art',
                'Biology',
                'Computer Science',
                'Physical Education',
                'Economics',
                'Sociology',
                'Psychology',
                'Political Science',
                'Business Studies',
                'Environmental Science',
                'Drama',
                'Foreign Languages',
                'Engineering',
                'Literature'
            ]).notNullable(); // Subject enum
            table.timestamps(true, true); // Timestamps for quiz creation/update
        })
        
        // Create questions table
        .createTable('questions', function(table) {
            table.increments('id').primary();
            table.integer('quiz_id').unsigned().notNullable()
                .references('id').inTable('quizzes') // Reference to quizzes
                .onDelete('CASCADE');
            table.string('question_text').notNullable(); // Question text
            table.string('question_img').nullable(); // Optional image for the question
            table.boolean('has_choices').defaultTo(false); // Flag for choices
            table.json('choices').nullable(); // Store choices as JSON (for flexibility)
            table.string('correct_answer').nullable(); // Store the correct answer
            table.timestamps(true, true); // Timestamps for question creation/update
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('questions')
        .dropTableIfExists('quizzes');
};
