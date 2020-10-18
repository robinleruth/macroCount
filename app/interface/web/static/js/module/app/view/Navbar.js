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
       this.currentState = 'meal-event';
   },
   render: function(){
       this.$el.html(this.template());
       return this;
   },
    triggerMeal: function(){
       this.currentState = 'meal-event';
       this.triggerCurrent();
    },
    triggerTodo: function(){
       this.currentState = 'todo-event';
        this.triggerCurrent();
    },
    triggerSleep: function(){
       this.currentState = 'sleep-event';
       this.triggerCurrent();
    },
    triggerCurrent: function(){
        this.trigger(this.currentState);
    }
});
