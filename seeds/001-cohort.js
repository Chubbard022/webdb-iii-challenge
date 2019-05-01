
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cohort').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohort').insert([
        { name: 'web18'},
        { name: 'web17'},
      ]);
    });
};
