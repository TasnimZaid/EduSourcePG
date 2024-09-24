exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('student').del()
    .then(function () {
      // Inserts seed entries
      return knex('student').insert([
        { name: 'Emily Davis', password: 'studentpass1', subject: 'Math', email: 'emily.davis@example.com', gender: 'female', isActivate: true, otp: null },
        { name: 'Frank Miller', password: 'studentpass2', subject: 'Science', email: 'frank.miller@example.com', gender: 'male', isActivate: true, otp: null },
        { name: 'Grace Lee', password: 'studentpass3', subject: 'English', email: 'grace.lee@example.com', gender: 'female', isActivate: true, otp: null },
        { name: 'Henry Garcia', password: 'studentpass4', subject: 'History', email: 'henry.garcia@example.com', gender: 'male', isActivate: true, otp: null }
      ]);
    });
};
