'use strict';

var app = app || {};

app.App = Backbone.Model.extend({
    defaults: function(){
        return {
            calorieTarget: 2000,
            calorieEaten: 0,
            nbCarb: 0,
            nbFat: 0,
            nbProt: 0,
            date: new Date(),
            mealCol: new app.MealCol()
        };
    }
});
