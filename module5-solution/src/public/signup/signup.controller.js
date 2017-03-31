(function () {
"use strict";

	angular.module('public')
	.controller('SignUpController', SignUpController);

	SignUpController.$inject = ['MenuService', 'RegistrationService'];
	function SignUpController(MenuService, RegistrationService) {
		var signUpCtrl = this;
		signUpCtrl.userProfile = {};

		signUpCtrl.submit = function () {

			RegistrationService.setUserProfile(signUpCtrl.userProfile);
			signUpCtrl.registered = true;
		}

		signUpCtrl.validateFavorite = function () {

			MenuService.getFavoriteDish(signUpCtrl.userProfile.favorite)
			.then(function () {
				signUpCtrl.favoriteValid = true;
			})
			.catch (function () {
				signUpCtrl.favoriteValid = false;
			});
		}
	};

})();
