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
				nothingFound: '<'
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
		narrowDown.nothingFound = false;

		narrowDown.search = function () {

			// Verify search term  exists
			if (narrowDown.searchTerm == null || narrowDown.searchTerm === "") {
				narrowDown.found = [];
				narrowDown.nothingFound = true;
				return;
			}

			var promise = MenuSearchService.getMatchedMenuItems(narrowDown.searchTerm);

			promise.then(function (response) {

				// narrowDown.found = response;
				if (response.length !== 0) {
					narrowDown.nothingFound = false;
					narrowDown.found = response;
				} else {
					narrowDown.nothingFound = true;
					narrowDown.found = [];
				}
			})

			.catch (function (error) {
				console.error("Something went terribly wrong.");
				narrowDown.nothingFound = true;
				narrowDown.found = [];
			});
		};

		narrowDown.removeItem = function (itemIndex) {
			narrowDown.found.splice(itemIndex, 1);
		}
	}

	MenuSearchService.$inject = ['$http', 'ApiBasePath'];
	function MenuSearchService($http, ApiBasePath) {
		var service = this;

		service.getMatchedMenuItems = function (searchTerm) {

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
			return filteredItemList;
		}

	}

})();