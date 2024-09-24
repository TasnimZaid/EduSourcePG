exports.up = function(knex) {
    return knex.schema.createTable('teacher', function(table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable(); 
        table.enu("gender", ["male", "female"]);
        table.string('school_name').nullable();  // Add school name field
        table.string('university_name').notNullable();  // Add university name field
        table.string('certificate_img').nullable();  // Add certificate image URL
        table.string('teacher_img').nullable();  // Add teacher profile image URL
        table.boolean("isActivate").defaultTo(true);
        table.string("otp").nullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('teacher');
};
