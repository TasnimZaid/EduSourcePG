
// رح تتغير هادي السكيما !


exports.up = function(knex) {
    return knex.schema.createTable('responses', function(table) {
        table.increments('id').primary(); // Unique identifier for each response
        table.integer('request_id').unsigned().notNullable()
            .references('id').inTable('consultation_requests').onDelete('CASCADE'); // Reference to the consultation request
        table.integer('teacher_id').unsigned().notNullable()
            .references('id').inTable('teacher').onDelete('CASCADE'); // Reference to the teacher who made the response
        table.integer('consultant_id').unsigned().nullable()
            .references('id').inTable('teacher').onDelete('SET NULL'); // Reference to the consultant (if applicable)
        table.integer('quiz_id').unsigned().nullable()
            .references('id').inTable('quizzes').onDelete('SET NULL'); // Reference to the quiz associated with the response
        table.text('feedback').nullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()); 
        table.timestamp('updated_at').defaultTo(knex.fn.now()); 
        table.boolean('isActive').defaultTo(true); 
         // New columns being added
         table.string('url').nullable(); // Optional URL for additional information or resources
         table.text('text').nullable(); // Additional textual content or message
         table.string('img').nullable(); // URL for an image related to the response (e.g., image of a document)
         table.text('description').nullable(); // Detailed description of the response
 
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('responses');
};
