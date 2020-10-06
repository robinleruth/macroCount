'use strict';

var app = app || {};

app.MealCol = Backbone.Collection.extend({
   initialize: function(models, options) {
       this.date = options.date;
    this.localStorage = new Backbone.LocalStorage("meals-" + this.date);
    },
   model: app.Meal,
   // url: '/api/v1/meal'
    getEaten: function(isEaten) {
        let filtered = this.filter(meal => meal.get('eaten') === isEaten);
        return new app.MealCol(filtered);
    },
    comparator: model => !model.get('eaten')
});
