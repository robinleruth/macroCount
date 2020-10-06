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
            date: this.getTodayDate(),
            mealCol: new app.MealCol(null, {date: this.getTodayDate()}),
            mealSuggestion: new app.MealCol(null, {date: 'suggestion'}),
            todoCol: new app.TodoCol(null, {date: this.getTodayDate()}),
            todoSuggestion: new app.TodoCol(null, {date: 'suggestion'})
        };
    },
    getTodayDate: function() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        return yyyy + '-' + mm + '-' + dd;
    }
});
