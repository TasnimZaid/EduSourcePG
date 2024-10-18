exports.up = function(knex) {
    return knex.schema.createTable('consultation_requests', function(table) {
        table.increments('id').primary();
        table.integer('teacher_id').unsigned().notNullable()
            .references('id').inTable('teacher').onDelete('CASCADE'); // Reference to the teacher who made the request
        table.integer('consultant_id').unsigned().nullable() // Reference to the teacher acting as a consultant
            .references('id').inTable('teacher').onDelete('SET NULL'); // If the consultant is deleted, set to NULL
        table.integer('user_id').unsigned().nullable(); // Reference to the user who made the request
        table.string('request_type').notNullable(); // Type of request (e.g., exam, lesson plan, etc.)
        table.text('description').nullable(); // Detailed description of the request
        table.string('file_url').nullable(); // Optional URL for uploaded files (e.g., PDFs, videos)
        table.decimal('payment_amount', 10, 2).nullable(); // Amount paid for the consultation
        table.string('payment_status').defaultTo('pending'); // Status of the payment (e.g., pending, completed, refunded)
        table.boolean('is_completed').defaultTo(false); 
        table.timestamp('created_at').defaultTo(knex.fn.now()); 
        table.timestamp('updated_at').defaultTo(knex.fn.now()); 
        table.integer('quiz_id').unsigned().nullable() 
            .references('id').inTable('quizzes').onDelete('SET NULL'); 
        table.boolean('isActive').defaultTo(true); // هاد ع الفاضي 
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('consultation_requests');
};
