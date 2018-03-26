'use strict';

/**
 * @ngdoc function
 * @name udaciMealsApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the udaciMealsApp
 */
angular.module('udaciMealsApp')
  .controller('MenuCtrl', ['orderManager','foodFinder', function (orderManager, foodFinder) {
  	var vm = this;
  	this.items ='';
    
    foodFinder.getMenu().then(function(data){
      vm.items = data;
    });

  	this.increment = function(item){
  		item.rating = ((item.rating * 10 ) + 1) / 10;
  	};

  	this.decrement = function(item){
  		item.rating = ((item.rating * 10 ) - 1) / 10;
  	};

  	this.chooseItem = function(menuCategory, menuItemName){
  		orderManager.chooseMenuOption(menuCategory, menuItemName);
  	};

  }]);
