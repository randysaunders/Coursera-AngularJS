(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
  $scope.lunchItems = "";
  $scope.lunchMessage = "";
  $scope.buttonLabel = "Check If Too Much"
  
  $scope.textBoxBorder = "";
  $scope.msgFontColor = "";
  
  $scope.countLunchItems = function () {
    
	var foodItems = $scope.lunchItems;
	var numberItems = 0;

	if (foodItems == "") {
		numberItems = 0;
	}
	else {
		var lunchItemList = foodItems.split(",");
		numberItems = lunchItemList.length;
    }
	
	// console.log(lunchItemList);
	// console.log(numberItems);
	
	switch(numberItems) {
    case 0:
        $scope.lunchMessage = "Please enter data first";
		$scope.textBoxBorder = {"border-color" : "red"};
		$scope.msgFontColor = {"color" : "red"};
		break;
    case 1:
	case 2:
	case 3:
        $scope.lunchMessage = "Enjoy!";
		$scope.textBoxBorder = {"border-color" : "green"};
		$scope.msgFontColor = {"color" : "green"};
		break;
    default:
        $scope.lunchMessage = "Too Much!";
		$scope.textBoxBorder  = {"border-color" : "green"};
		$scope.msgFontColor = {"color" : "green"};
}

	
  };
}

})();
