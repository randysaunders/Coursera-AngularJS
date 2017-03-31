(function () {
"use strict";

	angular.module('public')
	.controller('SignUpController', SignUpController);

	SignUpController.$inject = ['MenuService', 'RegistrationService', '$scope'];
	function SignUpController(MenuService, RegistrationService, $scope) {
		var signUpCtrl = this;
		signUpCtrl.userProfile = {};

		signUpCtrl.submit = function () {

			RegistrationService.setUserProfile(signUpCtrl.userProfile);
			signUpCtrl.registered = true;
		}

		signUpCtrl.validateFavorite = function () {

			if (signUpCtrl.userProfile.favorite) {
				signUpCtrl.userProfile.favorite = signUpCtrl.userProfile.favorite.toUpperCase();

				MenuService.getFavoriteDish(signUpCtrl.userProfile.favorite)
				.then(function () {
					signUpCtrl.favoriteValid = true;
					$scope.regForm.favDish.$setValidity("favDish", true); // form element favDish is valid

				})
				.catch (function () {
					signUpCtrl.favoriteValid = false;
					$scope.regForm.favDish.$setValidity("favDish", false); // form element favDish is not valid
				});
			} else {
				signUpCtrl.favoriteValid = false;
				$scope.regForm.favDish.$setValidity("favDish", false); // form element favDish is not valid
			}

		}
	};

})();
