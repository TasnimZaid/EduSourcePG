exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('teacher').del()
    .then(function () {
      // Inserts seed entries
      return knex('teacher').insert([
        { name: 'Alice Johnson', email: 'alice.johnson@example.com', password: 'password123', gender: 'female',  school_name: 'Lincoln High School', university_name: 'University of Education', certificate_img: null, teacher_img: null },
        { name: 'Bob Smith', email: 'bob.smith@example.com', password: 'password123', gender: 'male',  school_name: 'Greenwood Academy', university_name: 'Science University', certificate_img: null, teacher_img: null },
        { name: 'Cathy Brown', email: 'cathy.brown@example.com', password: 'password123', gender: 'female',  school_name: 'Central High School', university_name: 'Arts University', certificate_img: null, teacher_img: null },
        { name: 'David Wilson', email: 'david.wilson@example.com', password: 'password123', gender: 'male',  school_name: 'Westside School', university_name: 'History University', certificate_img: null, teacher_img: null }
      ]);
    });
};
