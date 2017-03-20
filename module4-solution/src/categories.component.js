(function () {
'use strict';

	angular.module('MenuApp')
	.component('categories', {
		templateUrl: 'src/templates/categories-detail.template.html',
		bindings: {
			items: '<',
		}
	});
})()
