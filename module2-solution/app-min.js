!function(){"use strict";function a(a){var b=this;b.items=a.getToBuyItems(),b.buyItem=function(b){a.buyItem(b)}}function b(a){var b=this;b.items=a.getAlreadyBoughtItems()}function c(){var a=this,b=[{item_name:"cookies",item_quantity:10},{item_name:"chips",item_quantity:5},{item_name:"bananas",item_quantity:6},{item_name:"milk",item_quantity:1},{item_name:"water",item_quantity:6}],c=[];a.buyItem=function(a){c.push(b[a]),b.splice(a,1)},a.getToBuyItems=function(){return b},a.getAlreadyBoughtItems=function(){return c}}angular.module("ShoppingListCheckOff",[]).controller("ToBuyController",a).controller("AlreadyBoughtController",b).service("ShoppingListCheckOffService",c),a.$inject=["ShoppingListCheckOffService"],b.$inject=["ShoppingListCheckOffService"]}();