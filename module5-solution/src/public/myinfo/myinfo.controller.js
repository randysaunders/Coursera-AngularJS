(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['MenuService', 'userProfile'];
function MyInfoController(MenuService,userProfile) {

	var myInfoCtrl = this;
		
	if (userProfile) {
		myInfoCtrl.registered = true;
		myInfoCtrl.userProfile = userProfile;
		
		
		MenuService.getFavoriteDish(userProfile.favorite)
		.then(function(response) {
			myInfoCtrl.favoriteDishDetails = response;
		})
		.catch(function(response) {
			console.error(response);
      });
	} else {
		myInfoCtrl.registered = false
  };
  
};

})();
