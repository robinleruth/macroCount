'use strict';

var app = app || {};

app.Navbar = Backbone.View.extend({
   template: _.template($('#navbar_template').html()),
   tagName: 'div',
   className: '',
   events: {
       'click .meal': 'triggerMeal',
       'click .todo': 'triggerTodo',
       'click .sleep': 'triggerSleep'
   },
   initialize: function(){
   },
   render: function(){
       this.$el.html(this.template());
       return this;
   },
    triggerMeal: function(){
        this.trigger('meal-event');
    },
    triggerTodo: function(){
        this.trigger('todo-event');
    },
    triggerSleep: function(){
        this.trigger('sleep-event');
    },
});
