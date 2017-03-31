(function () {
"use strict";

angular.module('common')
.service('RegistrationService', RegistrationService);

function RegistrationService() {
  var service = this;

  service.setUserProfile = function (userProfile) {
    service.userProfile = userProfile;
  };

  service.getUserProfile = function() {
    return service.userProfile;
  }
};

})();
