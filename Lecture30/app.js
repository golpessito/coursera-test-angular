(function(){
  'use strict';

  angular.module('ShoppingListDirectiveApp',[])
  .controller('ShoppingList1Controller',ShoppingList1Controller)
  .controller('ShoppingList2Controller',ShoppingList2Controller)
  .factory('ShoppingListFactory',ShoppingListFactory)
  .directive('shoppingList',ShoppingListDirective);

  function ShoppingListDirective(){
    var ddo={
      templateUrl:'shoppingList.html',
      scope:{
        items:'<',
        title:'@',
        onRemove:'&'
      },
      controller: ShoppingListDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };

    return ddo;
  };

  function ShoppingListDirectiveController(){
    var list=this;

    list.cookiesInList=function(){
      for(var i=0; i<list.items.length; i++){
        var name=list.items[i].name;
        if(name.toLowerCase().indexOf('cookie')!==-1){
          return true;
        };
      };

      return false;

    };

  };

  ShoppingList1Controller.$inject=['ShoppingListFactory'];
  function ShoppingList1Controller(ShoppingListFactory){
    var list=this;
    var origTitle="Shopping List #1";
    var shoppingList= ShoppingListFactory();

    list.nameItem="";
    list.quantityItem="";
    list.items=shoppingList.getItems();
    list.title=origTitle+" ( "+list.items.length+" items )";

    list.removeItem=function(index){
      shoppingList.removeItem(index);
      list.title=origTitle+" ( "+list.items.length+" items )";
    };

    list.addItem=function(){
      shoppingList.addItem(list.nameItem,list.quantityItem);
      list.title=origTitle+" ( "+list.items.length+" items )";
    };

  };

  ShoppingList2Controller.$inject=['ShoppingListFactory'];
  function ShoppingList2Controller(ShoppingListFactory){

    var list=this;
    var shoppingList= ShoppingListFactory(3);

    list.nameItem="";
    list.quantityItem="";
    list.items=shoppingList.getItems();

    list.removeItem=function(index){
      shoppingList.removeItem(index);
    };

    list.addItem=function(){
      try {
        shoppingList.addItem(list.nameItem,list.quantityItem);
      } catch (error) {
        list.error=error.message;
      }

    };
  };

  function ShoppingListService(maxItems){

    var service=this;
    var items=[];

    service.addItem=function(nameItem,quantityItem){

      if(maxItems===undefined || (maxItems!==undefined && items.length<maxItems)){
        var item={
          name:nameItem,
          quantity:quantityItem
        };

        items.push(item);
      }
      else {
        throw new Error("Exceeded number of elements");
      }

    };
    service.removeItem=function(index){
      items.splice(index,1);
    };

    service.getItems=function(){
      return items;
    };

  };

  function ShoppingListFactory(){
    var factory=function(maxItems){
      return new ShoppingListService(maxItems);
    };
    return factory;
  };

})();
