(function () {
'use strict';

	angular.module('MenuApp', ['ui.router'])
	.controller('CategoriesController', CategoriesController)
	.controller('ItemsController', ItemsController)
	.service('MenuDataService', MenuDataService)
	.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
	.config(RoutesConfig)
	.component('categories', {
		templateUrl: 'src/templates/categories-detail.template.html',
		bindings: {
			items: '<',
		}
	})
	.component('items', {
		templateUrl: 'src/templates/items-detail.template.html',
		bindings: {
			items: '<'
		}
	});
	//
	// 'categories' is injected through state's resolve
	CategoriesController.$inject = ['categories']
	function CategoriesController(categories) {
		var CategoriesController = this;
		CategoriesController.categories = categories;
	}

	// 'items' is injected through state's resolve
	ItemsController.$inject = ['items']
	function ItemsController(items) {
		var itemsController = this;
		itemsController.items = items;
	}

	MenuDataService.$inject = ['$http', 'ApiBasePath'];
	function MenuDataService($http, ApiBasePath) {
		var service = this;

		service.getAllCategories = function () {

			return $http({
				method: 'GET',
				url: (ApiBasePath + '/categories.json')
			});
		};

		service.getItemsForCategory = function (categoryShortName) {
			return $http({
				method: 'GET',
				url: (ApiBasePath + '/menu_items.json'),
				params: {
					category: categoryShortName
				}
			});
		}
	}

	RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
	function RoutesConfig($stateProvider, $urlRouterProvider) {

		// Redirect to home page if no other URL matches
		$urlRouterProvider.otherwise('/');

		// *** Set up UI states ***
		$stateProvider

		// Home page
		.state('home', {
			url: '/',
			templateUrl: 'src/templates/home.template.html'
		})

		// Categories page
		.state('categories', {
			url: '/categories',
			templateUrl: 'src/templates/categories.template.html',
			controller: 'CategoriesController as categoriesController',
			resolve: {
				categories: ['MenuDataService', function (MenuDataService) {
						return MenuDataService.getAllCategories()
						.then(function (response) {
							return response.data;
						});
					}
				]
			}
		})

		// Items page
		.state('items', {
			url: '/items/{category}',
			templateUrl: 'src/templates/items.template.html',
			controller: 'ItemsController as itemsController',
			resolve: {
				items: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
						return MenuDataService.getItemsForCategory($stateParams.category).then(function (response) {
							return response.data.menu_items;
						});
					}
				]
			}
		});
	}

})();