'use strict';

var app = app || {};

app.TodoController = Backbone.View.extend({
   template: _.template($('#todo_controller_template').html()),
   tagName: 'div',
   className: '',
   events: {
   },
   initialize: function(){
       this.listenTo(this.model, 'change', this.render);
       this.listenTo(this.model, 'destroy', this.remove);
       this.listenTo(this.model, 're-render', this.render);
   },
   render: function(){
       this.$el.html(this.template());
       return this;
   },
});
