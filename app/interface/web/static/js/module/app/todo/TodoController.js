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
        console.log('initialize TodoController');
       // this.listenTo(this.collection, 'update', this.render);

       this.suggestionColView = new app.TodoColView({model: app.app, colName: 'todoSuggestion'});
       this.todayColView = new app.TodoColView({model: app.app, colName: 'todoCol'});

       this.suggestionColView.listenTo(app.app.get('todoSuggestion'), 'click-on-todo-suggestion', this.feedInput.bind(this));
   },
   render: function(){
        console.log('render TodoController');
       this.$el.html(this.template());
       this.$('#suggestionTodo').append(this.suggestionColView.render().el);
       this.suggestionColView.delegateEvents();
       this.$('#todoOfTheDay').append(this.todayColView.render().el);
       this.todayColView.delegateEvents();
       return this;
   },
    create: function(){
        console.log('create TodoController');
        // this.collection.create();
        app.app.addTodo({
            item: this.$('input.item').val(),
            number: this.$('input.number').val()
        });
    },
    feedInput: function(e){
        console.log('feedInput TodoController');
        this.$('input.number').val(e.get('number'));
        this.$('input.item').val(e.get('item'));
    },
});
