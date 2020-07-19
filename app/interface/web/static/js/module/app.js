'use strict';

var app = app || {};

(function(){
    app.mealCol = new app.MealCol();

    app.app = new app.App();

    app.appView = new app.AppView({model: app.app});

    console.log('Start up !');
})();

