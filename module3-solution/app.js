(function () {
	'use strict';

	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.directive('foundItems', FoundItemsDirective)
	.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

	function FoundItemsDirective() {
		var ddo = {
			templateUrl: 'foundList.html',
			scope: {
				items: '<',
				onRemove: '&',
				errorDisplay: '<'
			},
			controller: NarrowItDownController,
            controllerAs: 'found',
            bindToController: true
		};

		return ddo;
	}
	
	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService) {
		var narrowDown = this;
		narrowDown.found = [];
		narrowDown.emptySearch = "";
		narrowDown.errorDisplay = false;
		
		narrowDown.search = function () {
			console.log('searchTerm: ', narrowDown.searchTerm);

			// Verify search term  exists
			if (narrowDown.searchTerm == null || narrowDown.searchTerm === "") {
				narrowDown.found = [];
				narrowDown.errorDisplay = true;
				narrowDown.emptySearch = "Nothing found";
				console.log('empty outcome');
				return;
			}

			var promise = MenuSearchService.getMatchedMenuItems(narrowDown.searchTerm);

			promise.then(function (response) {

				// narrowDown.found = response;

				if (response.length !== 0) {
					narrowDown.errorDisplay = false;
					narrowDown.found = response;
					// console.log('good outcome');
					// console.log('response: ', response);
					narrowDown.emptySearch = "";

				} else {
					narrowDown.errorDisplay = true;
					narrowDown.found = [];
					// console.log('bad outcome');
					// console.log('response: ', response);

				}
			})

			.catch (function (error) {
				console.log("Something went terribly wrong.");
				narrowDown.errorDisplay = true;
				narrowDown.found = [];
			});
		};

		narrowDown.removeItem = function (itemIndex) {
			narrowDown.found.splice(itemIndex, 1);
		}
		
		narrowDown.noItemsFound = function () {
			if (narrowDown.items.length === 0) { 
				return true;
			} else {
				return false;
			}	
		}
	}

	MenuSearchService.$inject = ['$http', 'ApiBasePath'];
	function MenuSearchService($http, ApiBasePath) {
		var service = this;

		service.getMatchedMenuItems = function (searchTerm) {
			// Does searchTerm exist?
			// if (searchTerm == null || searchTerm === '') {
			// 	return [];
			// }

			console.log('in service ...');

			return $http({
				method: "GET",
				url: (ApiBasePath + "/menu_items.json")
			}).then(function (result) {
				// process result and only keep items that match
				var findItems = searchForTermResults(result.data.menu_items, searchTerm);

				// return processed items
				return findItems;
			})
		};

		function searchForTermResults(unfilteredList, searchTerm) {

			var filteredItemList = [];

			for (var i = 0; i < unfilteredList.length; i++) {

				if (unfilteredList[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
					// search matches
					filteredItemList.push(unfilteredList[i]);
				}
			}
			console.log('filteredItemList: ', filteredItemList);
			return filteredItemList;
		}
		
	}

})();