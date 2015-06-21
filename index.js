'use strict';

var _ = require('lodash');
var knexfile = require('./knexfile');
var knex = require('knex')(knexfile.development);
var bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry');


var BaseModel = bookshelf.Model.extend({
  format: function(attrs) {
    // Convert keys to database column names (camelCase -> snake_case)
    return _.reduce(attrs, function(memo, val, key) {
      memo[_.snakeCase(key)] = val;
      return memo;
    }, {});
  },

  parse: function(attrs) {
    // Convert keys from database column names (snake_case -> camelCase)
    return _.reduce(attrs, function(memo, val, key) {
      memo[_.camelCase(key)] = val;
      return memo;
    }, {});
  }
});


var Recipe = bookshelf.model('Recipe', BaseModel.extend({
  tableName: 'recipes',

  defaults: {
    name: null
  },

  ingredients: function () {
    return this
      .belongsToMany('Ingredient', 'recipe_ingredients')
      .withPivot(['measurement']);
      // .through('RecipeIngredient');
  },

  recipeIngredients: function () {
    return this
      .hasMany('RecipeIngredient');
  }
}));


var RecipeIngredient =   bookshelf.model('RecipeIngredient', BaseModel.extend({
    tableName: 'recipe_ingredients',

    defaults: {
      recipeId: null,
      ingredientId: null,
      measurement: null
    },

    ingredient: function () {
      return this
        .belongsTo('Ingredient');
    }
  }));


var Ingredient = bookshelf.model('Ingredient', BaseModel.extend({
  tableName: 'ingredients',

  defaults: {
    name: null
  }
}));


Recipe
  .forge({
    id: 1
  })
  .fetch({
    withRelated: [
      'recipeIngredients.ingredient',
      'ingredients'
    ]
  })
  .then(function (model) {
    return console.log('Recipe (fetch 1)', JSON.stringify(model.toJSON(), null, 2));
  })
  .catch(function (err) {
    return console.error('Recipe (fetch 1, err)', err);
  });
