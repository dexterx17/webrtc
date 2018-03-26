'use strict';

/**
 * @ngdoc overview
 * @name udaciMealsApp
 * @description
 * # udaciMealsApp
 *
 * Main module of the application.
 */
angular
  .module('udaciMealsApp', ['ui.router'])
  .config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider){

  	$urlRouterProvider.otherwise('/');

  	$stateProvider.state('home',{
  		url: '/',
  		templateUrl: 'views/menu.html',
  		controller: 'MenuCtrl as menu'
  	})
  	.state('item',{
  		url: '/item/:id',
  		templateUrl: 'views/item.html',
  		controller: 'ItemCtrl as item'
  	})
    .state('item.nutricion',{
      url:'/nutricion',
      templateUrl:'views/item-nutricion.html'
    })
    .state('item.reviews',{
      url:'/reviews',
      templateUrl:'views/item-reviews.html'
    });
  }]);
