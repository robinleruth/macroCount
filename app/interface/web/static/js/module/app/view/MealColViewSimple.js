'use strict';

var app = app || {};

app.MealColViewSimple = Backbone.View.extend({
   template: _.template($('#meal_col_view_simple_template').html()),
   tagName: 'div',
   className: '',
   events: {
   },
   initialize: function(){
       this.collection.fetch();
       this.listenTo(this.collection, 'update', this.render);
       this.listenTo(this.collection, 'click-on-meal', this.triggerEvent);
   },
   render: function(){
       this.$el.html(this.template());
       this.addAll();
       return this;
   },
    addOne: function(model){
        var view = new app.MealView({model: model});
        this.$el.append(view.render().el);
    },
    addAll: function(){
        this.collection.each(this.addOne, this);
    },
    triggerEvent: function(e){
        this.trigger('click-on-meal', e);
    }
});
