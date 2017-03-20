(function() {
'use strict';

angular.module('MenuApp')
  .component('items', {
    templateUrl: 'src/templates/items-detail.template.html',
    bindings: {
      items: '<'
    }
  });

})();
