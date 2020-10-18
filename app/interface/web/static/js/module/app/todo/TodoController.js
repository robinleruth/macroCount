'use strict';

var app = app || {};

app.TodoController = Backbone.View.extend({
   template: _.template($('#todo_controller_template').html()),
   tagName: 'div',
   className: '',
   events: {
        'click .new_one': 'create',
   },
   initialize: function(){
       // this.listenTo(this.collection, 'update', this.render);

       this.suggestionColView = new app.TodoColView({collection: app.app.get('todoSuggestion')});
       this.todayColView = new app.TodoColView({collection: this.collection});
   },
   render: function(){
       this.$el.html(this.template());
       this.$('#suggestionTodo').append(this.suggestionColView.render().el);
       this.$('#todoOfTheDay').append(this.todayColView.render().el);
       return this;
   },
    create: function(){
        // this.collection.create();
        app.app.addTodo({
            item: 'ok',
            number: this.$('input').val()
        });
    }
});
