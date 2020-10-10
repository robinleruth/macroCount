'use strict';

var app = app || {};

app.Navbar = Backbone.View.extend({
   template: _.template($('#navbar_template').html()),
   tagName: 'div',
   className: '',
   events: {
   },
   initialize: function(){
   },
   render: function(){
       this.$el.html(this.template());
       return this;
   },
});
