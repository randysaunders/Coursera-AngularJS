(function () {
	'use strict';

	angular.module('ShoppingListCheckOff', [])
	.controller('ToBuyController', ToBuyController)
	.controller('AlreadyBoughtController', AlreadyBoughtController)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyController(ShoppingListCheckOffService) {
		var toBuyList = this;

		toBuyList.items = ShoppingListCheckOffService.getToBuyItems();
		
		toBuyList.buyItem = function (itemIndex) {
			ShoppingListCheckOffService.buyItem(itemIndex);
        }
	}

	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtController(ShoppingListCheckOffService) {
		var alreadyBoughtList = this;

		alreadyBoughtList.items = ShoppingListCheckOffService.getAlreadyBoughtItems();

	}

	function ShoppingListCheckOffService() {
		var service = this;

		// List of shopping items
		var toBuyItems = [{
				item_name: 'cookies',
				item_quantity: 10
			}, {
				item_name: 'chips',
				item_quantity: 5
			}, {
				item_name: 'bananas',
				item_quantity: 6
			}, {
				item_name: 'milk',
				item_quantity: 1
			}, {
				item_name: 'water',
				item_quantity: 6
			}
		];

		// Initially alreadyBoughtItems empty
		var alreadyBoughtItems = [];
		
		service.buyItem = function (itemIdex) {
			
			// Add item to alreadyBoughtItems
			alreadyBoughtItems.push(toBuyItems[itemIdex]);
			
			// remove item from toBuyItems
			toBuyItems.splice(itemIdex, 1);
        }
		
		service.getToBuyItems = function () {
			return toBuyItems;
		}

		service.getAlreadyBoughtItems = function () {
			return alreadyBoughtItems;
		}

	}

	})();