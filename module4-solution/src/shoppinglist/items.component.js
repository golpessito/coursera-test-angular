(function () {
'use strict';

angular.module('MenuApp')
.component('items', {
  templateUrl: 'src/shoppinglist/templates/items.template.html',
  bindings: {
    items: '<'
  }
});

})();
