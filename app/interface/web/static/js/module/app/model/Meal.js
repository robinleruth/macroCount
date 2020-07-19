'use strict';

var app = app || {};

app.Meal = Backbone.Model.extend({
    defaults: function(){
        return {
            name: 'A meal',
            fat: 0,
            prot: 0,
            carb: 0,
            eaten: false
        };
    }
});
