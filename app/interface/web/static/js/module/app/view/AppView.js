'use strict';

var app = app || {};

app.AppView = Backbone.View.extend({
   template: _.template($('#app_view_template').html()),
    el: $('#app'),
   tagName: 'div',
   className: '',
   events: {
       'click .change-date': 'changeDate'
   },
   initialize: function(){
        console.log('initialize AppView');
       this.listenTo(this.model, 'destroy', this.remove);
       this.listenTo(this.model, 're-render', this.render);
       this.listenTo(this.model.get('mealCol'), 'update', this.change);
       this.listenTo(this.model.get('mealCol'), 'reset', this.change);
       this.listenTo(this.model, 'change:mealCol', this.change);
       this.listenTo(this.model, 'change:date', this.updateCol);

       this.model.get('mealCol').fetch();
       this.model.get('mealSuggestion').fetch();
       this.model.get('todoCol').fetch();
       this.model.get('todoSuggestion').fetch();

       this.navbar = new app.Navbar();
       this.listenTo(this.navbar, 'meal-event', this.displayMeal);
       this.listenTo(this.navbar, 'todo-event', this.displayTodo);
       this.listenTo(this.navbar, 'sleep-event', this.displaySleep);

       this.todoController = new app.TodoController();

       this.listenTo(this.model, 'change', this.render);

       this.render();
   },
   render: function(){
        console.log('render AppView');
       this.$el.html(this.template(this.model.toJSON()));
       this.$('#navigation-bar').append(this.navbar.render().el);
       this.navbar.delegateEvents();
       this.$('#todoDiv').append(this.todoController.render().el);
       this.todoController.delegateEvents();
       new app.MealColView({
           el: this.$('.col'),
           collection: this.model.get('mealCol')
       });
       this.displayPie();
       this.navbar ? this.navbar.triggerCurrent() : this.displayMeal();
       return this;
   },
    change: function() {
        console.log('change AppView');
        let col = this.model.get('mealCol').models;
        this.model.set('nbFat', col.reduce((acc, el) => acc + el.get('fat'), 0));
        this.model.set('nbCarb', col.reduce((acc, el) => acc + el.get('carb'), 0));
        this.model.set('nbProt', col.reduce((acc, el) => acc + el.get('prot'), 0));
        let calorieProt = this.model.get('nbProt') * 4;
        let calorieFat = this.model.get('nbFat') * 9;
        let calorieCarb = this.model.get('nbCarb') * 4;
        this.model.set('calorieEaten', calorieProt + calorieFat + calorieCarb);
        return this;
    },
    displayPie: function() {
        console.log('displayPie AppView');
        let ctx = document.getElementById('pieChart').getContext('2d');
        let calorieProt = this.model.get('nbProt') * 4;
        let calorieFat = this.model.get('nbFat') * 9;
        let calorieCarb = this.model.get('nbCarb') * 4;
        let myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Carb', 'Fat', 'Prot'],
                datasets: [{
                    label: 'Proportion of macro nutriments',
                    data: [calorieCarb, calorieFat, calorieProt],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            }
        });
    },
    changeDate: function(){
        console.log('changeDate AppView');
        let date = this.$('#date-picker').val();
        this.model.set('date', date);
    },
    updateCol: function(){
        console.log('updateCol AppView');
       this.model.set('mealCol', new app.MealCol(null, {date: this.model.get('date')}));
       this.model.get('mealCol').fetch();

       this.model.set('todoCol', new app.TodoCol(null, {date: this.model.get('date')}));
       this.model.get('todoCol').fetch();
        this.change();
    },
    displayMeal: function(){
        console.log('displayMeal AppView');
        this.$('#mealDiv').css('display', '');
        this.$('#todoDiv').hide();
        this.$('#sleepDiv').hide();
    },
    displayTodo: function(){
        console.log('displayTodo AppView');
        this.$('#mealDiv').css({'cssText': 'display: none !important'});
        this.$('#todoDiv').fadeIn();
        this.$('#sleepDiv').hide();
    },
    displaySleep: function(){
        console.log('displaySleep AppView');
        this.$('#mealDiv').css({'cssText': 'display: none !important'});
        this.$('#todoDiv').hide();
        this.$('#sleepDiv').fadeIn();
    },
});
