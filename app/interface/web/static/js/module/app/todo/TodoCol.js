'use strict';

var app = app || {};

app.TodoCol = Backbone.Collection.extend({
   initialize: function(models, options) {
       this.date = options.date;
    this.localStorage = new Backbone.LocalStorage("todo-" + this.date);
    },
   model: app.Todo,
   // url: '/api/v1/todo'
});
