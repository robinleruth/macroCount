'use strict';

var app = app || {};

app.TodoColView = Backbone.View.extend({
    events: {
        'click .new_one': 'create',
    },
    initialize: function(){
        this.listenTo(this.collection, 'add', this.addOne);
        this.listenTo(this.collection, 'reset', this.render);
        // this.listenTo(this.collection, 'remove', this.render);
        // this.listenTo(this.collection, 're-render', this.render);
    },
    render: function(){
        this.$el.html('');
        this.addAll();
        return this;
    },
    addOne: function(model){
        let view = new app.TodoView({model: model});
        this.$el.append(view.render().el);
    },
    addAll: function(){
        this.collection.each(this.addOne, this);
    },
    create: function(){
        this.collection.create();
    }
});
