exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('teacher_materials').del()
    .then(function () {
      // Inserts seed entries
      return knex('teacher_materials').insert([
        { teacher_id: 1, material_id: 1 }, // Teacher 1 teaches Math
        { teacher_id: 1, material_id: 2 }, // Teacher 1 teaches Science
        { teacher_id: 2, material_id: 1 }, // Teacher 2 teaches Math
        { teacher_id: 2, material_id: 3 }, // Teacher 2 teaches English
        { teacher_id: 2, material_id: 4 }, // Teacher 2 teaches History
        // Add more teacher-material associations as needed
      ]);
    });
};
