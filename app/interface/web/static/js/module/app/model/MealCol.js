'use strict';

var app = app || {};

app.MealCol = Backbone.Collection.extend({
   model: app.Meal,
   // url: '/api/v1/meal'
    localStorage: new Backbone.LocalStorage("myData"),
    getEaten: function(isEaten) {
        let filtered = this.filter(meal => meal.get('eaten') === isEaten);
        return new app.MealCol(filtered);
    },
    comparator: model => !model.get('eaten')
});
