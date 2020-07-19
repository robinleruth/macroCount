'use strict';

var app = app || {};

app.AppView = Backbone.View.extend({
   template: _.template($('#app_view_template').html()),
    el: $('#app'),
   tagName: 'div',
   className: '',
   events: {
   },
   initialize: function(){
       this.listenTo(this.model, 'change', this.render);
       this.listenTo(this.model, 'destroy', this.remove);
       this.listenTo(this.model, 're-render', this.render);
       this.listenTo(this.model.get('mealCol'), 'update', this.change);

       this.model.get('mealCol').fetch();
       // this.change();
       this.render();
   },
   render: function(){
       this.$el.html(this.template(this.model.toJSON()));
       new app.MealColView({
           el: this.$('.col'),
           collection: this.model.get('mealCol')
       });
       this.displayPie();
       return this;
   },
    change: function() {
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
        let ctx = document.getElementById('pieChart').getContext('2d');
        let calorieProt = this.model.get('nbProt');
        let calorieFat = this.model.get('nbFat');
        let calorieCarb = this.model.get('nbCarb');
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
    }
});
