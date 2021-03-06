'use strict';

var app = app || {};

app.MealView = Backbone.View.extend({
   template: _.template($('#meal_view_template').html()),
   tagName: 'div',
   className: '',
   events: {
        'click .delete': 'clear',
        'click .parent': 'edit',
        'keypress .edit': 'updateOnEnter',
        'blur .edit': 'close',
        'click': 'triggerEvent',
   },
   initialize: function(){
       this.listenTo(this.model, 'change', this.render);
       this.listenTo(this.model, 'destroy', this.remove);
       this.listenTo(this.model, 're-render', this.render);
   },
   render: function(){
       this.$el.html(this.template(this.model.toJSON()));
       return this;
   },
    clear: function(){
        this.model.destroy();
    },
    edit: function(e){
        this.parent = $(e.currentTarget);
        this.parent.addClass('editing');
        this.attributeToChange = e.currentTarget.classList[1];
        this.input = $(this.parent.children()[1]);
        this.input.focus();
    },
    updateOnEnter: function(e){
        if(e.keyCode == 13)
            this.close();
    },
    close: function(){
        var value = this.input.val();
        var attr = this.parent;
        var j = {};
        j[this.attributeToChange] = value;
        this.model.save(j);
        this.parent.removeClass('editing');
    },
    triggerEvent: function(){
        this.model.trigger('click-on-meal', this.model);
        this.trigger('click-on-meal', this.model);
    }
});
