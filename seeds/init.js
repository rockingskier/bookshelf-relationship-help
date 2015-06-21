
exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('recipes').del(),
    knex('ingredients').del(),

    knex('recipes').insert({
      id: 1,
      name: 'Banana Cake'
    }),

    knex('ingredients').insert({
      id: 1,
      name: 'Banana'
    }),
    knex('ingredients').insert({
      id: 2,
      name: 'Cake'
    }),

    knex('recipe_ingredients').insert({
      id: 1,
      recipe_id: 1,
      ingredient_id: 1,
      measurement: '2'
    }),
    knex('recipe_ingredients').insert({
      id: 2,
      recipe_id: 1,
      ingredient_id: 2,
      measurement: '1'
    })
  );
};
