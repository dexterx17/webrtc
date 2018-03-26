'use strict';

/**
 * @ngdoc service
 * @name udaciMealsApp.orderManager
 * @description
 * # orderManager
 * Service in the udaciMealsApp.
 */
angular.module('udaciMealsApp')
  .service('orderManager', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var selectedDay = 'Lunes';

    var orderSelection = {
    	Lunes: {
    		breakfast:'',
    		lunch:'',
    		dinner:''
    	},
    	Martes: {
    		breakfast:'',
    		lunch:'',
    		dinner:''
    	},
    	Miercoles: {
    		breakfast:'',
    		lunch:'',
    		dinner:''
    	},
    	Jueves: {
    		breakfast:'',
    		lunch:'',
    		dinner:''
    	},
    	Viernes: {
    		breakfast:'',
    		lunch:'',
    		dinner:''
    	},
    	Sabado: {
    		breakfast:'',
    		lunch:'',
    		dinner:''
    	},
    	Domingo: {
    		breakfast:'',
    		lunch:'',
    		dinner:''
    	},
    };

	this.getActiveDay = function(){
		return selectedDay;
	};

	this.setActiveDay = function(day){
		selectedDay = day;
	};

	this.chooseMenuOption = function(meal, menuItem){
		orderSelection[selectedDay][meal] = menuItem;
	};

	this.removeMenuOption = function(day, menuCategory){
		orderSelection[day][menuCategory] = '';
	};
	
	this.getOrders = function(){
		return orderSelection;
	};

  });
