'use strict';

var app = app || {};

app.Todo = Backbone.Model.extend({
    defaults: function(){
        return {
            item: '',
            number: 0
        };
    }
});
