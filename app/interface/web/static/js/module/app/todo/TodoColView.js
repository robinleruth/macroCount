'use strict';

var app = app || {};

app.TodoColView = Backbone.View.extend({
    events: {
        'click .new_one': 'create',
    },
    initialize: function(options){
        console.log('initialize TodoColView : ' + options.colName);
        let colName = options.colName;
        this.colName = colName;
        let lt = 'change:' + colName;
        console.log('listenTo : ' + lt);
        this.listenTo(this.model, lt, this.render);
        this.listenTo(this.model, lt, this.rebindEvent);
        // this.listenTo(this.collection, 're-render', this.render);
        this.render();
    },
    render: function(){
        console.log('render TodoColView');
        this.collection = this.model.get(this.colName);
        this.$el.html('');
        this.addAll();
        return this;
    },
    rebindEvent: function() {
        this.stopListening(this.model.get(this.colName));
        this.listenTo(this.model.get(this.colName), 'add', this.addOne);
    },
    addOne: function(model){
        console.log('addOne TodoColView : ', JSON.stringify(model));
        let view = new app.TodoView({model: model});
        this.$el.append(view.render().el);
        view.delegateEvents();
    },
    addAll: function(){
        console.log('addAll TodoColView');
        this.collection.each(this.addOne, this);
    },
    create: function(){
        console.log('create TodoColView');
        this.collection.create();
    }
});
