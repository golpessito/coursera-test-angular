(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemDetailController', ItemDetailController);

// 'item' is injected through state's resolve
ItemDetailController.$inject = ['item']
function ItemDetailController(item) {
  var itemDetail=this;
  itemDetail.items= item.data.menu_items;
  itemDetail.greeting="HOLA";
  console.log("We are in ItemDetailController");
  console.log(itemDetail.items);

}

})();
