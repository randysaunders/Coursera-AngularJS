(function () {
'use strict';

	angular.module('MenuApp')
	.config(RoutesConfig);

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