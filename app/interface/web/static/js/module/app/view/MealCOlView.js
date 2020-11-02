'use strict';

var app = app || {};

app.MealColView = Backbone.View.extend({
   template: _.template($('#meal_col_view_template').html()),
   tagName: 'div',
   className: '',
   events: {
        'click .new_one': 'create',
        'click .close_modal': 'closeModal',
        'click .add_meal_by_modal': 'addMeal',
        'click .show_suggestion': 'showSuggestion',
   },
   initialize: function(){
       this.mealColViewSimple = new app.MealColViewSimple({collection: app.app.get('mealSuggestion')});
        this.listenTo(this.mealColViewSimple, 'click-on-meal', this.clickOnMeal);
        this.listenTo(this.collection, 'add', this.addOne);
        this.listenTo(this.collection, 're-render', this.render);
        this.render();
        this.addAll();
   },
   render: function(){
       this.$el.html(this.template());
       this.$('.modal-after-footer').append(this.mealColViewSimple.render().el);
       this.mealColViewSimple.delegateEvents();
       return this;
   },
    addOne: function(model){
        var view = new app.MealView({model: model});
        this.$el.append(view.render().el);
    },
    addAll: function(){
        this.collection.each(this.addOne, this);
    },
    create: function(){
        this.$('.modal').show();
    },
    closeModal: function() {
        this.$('.modal').hide();
        this.$('.modal-after-footer').hide();
    },
    addMeal: function() {
        let name = this.$('#name').get()[0].value || 'A meal';
        let fat = parseInt(this.$('#fat').get()[0].value || 0);
        let carb = parseInt(this.$('#carb').get()[0].value || 0);
        let prot = parseInt(this.$('#prot').get()[0].value || 0);
        this.collection.create({name: name, fat: fat, carb: carb, prot: prot});
        this.$('#name').get()[0].value = '';
        this.$('#fat').get()[0].value = 0;
        this.$('#carb').get()[0].value = 0 ;
        this.$('#prot').get()[0].value = 0;
        this.$('.modal').hide();
        app.app.addMeal({name: name, fat: fat, carb: carb, prot: prot});
    },
    showSuggestion: function(){
        this.$('.modal-after-footer').fadeIn();
        app.app.get('mealSuggestion').fetch();
    },
    clickOnMeal: function(e){
        this.$('#name').get()[0].value = e.get('name');
        this.$('#fat').get()[0].value = e.get('fat');
        this.$('#carb').get()[0].value = e.get('carb');
        this.$('#prot').get()[0].value = e.get('prot');
    }
});
