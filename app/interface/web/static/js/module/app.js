'use strict';

var app = app || {};

(function(){
    app.app = new app.App();
    app.app.get('mealSuggestion').fetch();
    app.app.get('todoSuggestion').fetch();

    app.appView = new app.AppView({model: app.app});

    console.log('Start up !');
})();

