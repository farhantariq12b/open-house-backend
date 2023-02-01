
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('property').del()
    .then(() => {
      // Inserts seed entries
      return knex('property').insert([
        {id: 1, address: 'Create API'},
      ]);
    });
};
