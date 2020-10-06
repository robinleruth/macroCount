'use strict';

var app = app || {};

app.TodoCol = Backbone.Collection.extend({
   model: app.Todo,
   url: '/api/v1/todo'
});
