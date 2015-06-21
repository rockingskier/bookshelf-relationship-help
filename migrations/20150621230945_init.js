'use strict';

exports.up = function(knex/*, Promise*/) {
  return knex.schema
    .createTable('recipes', function (table) {
      table.increments('id').primary();
      table.string('name');
    })

    .createTable('ingredients', function (table) {
      table.increments('id').primary();
      table.string('name');
    })

    .createTable('recipe_ingredients', function(table) {
      table.increments('id').primary();
      table.string('measurement');

      // Relationships
      table.integer('recipe_id')
        .references('id')
        .inTable('recipe');
      table.integer('ingredient_id')
        .references('id')
        .inTable('ingredient');
    });
};

exports.down = function(knex/*, Promise*/) {
  return knex.schema
    .dropTable('recipes')
    .dropTable('ingredients')
    .dropTable('recipe_ingredients');
};
