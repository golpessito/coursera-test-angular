(function(){
  'use strict';

  angular.module('ShoppingListCheckOff',[])
  .controller('ToBuyController',ToBuyController)
  .controller('AlreadyBoughtController',AlreadyBoughtController)
  .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

  //To Buy List Controller
  ToBuyController.$inject=['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService){
    var buyList=this;
    buyList.items=ShoppingListCheckOffService.getToBuyItems();

    //Function to buy items
    buyList.buyItem = function(indexItem)
    {
      ShoppingListCheckOffService.buyItem(indexItem);
    };

    buyList.isEmpty=function(){
      return !buyList.items.length;
    };

  };


  //Already Buy Controller
  AlreadyBoughtController.$inject=['ShoppingListCheckOffService'];

  function AlreadyBoughtController(ShoppingListCheckOffService){

    var bougthList=this;
    bougthList.items=ShoppingListCheckOffService.getAlredayBuyItems();

    bougthList.isEmpty=function(){
      return !bougthList.items.length;
    };

  };


  function ShoppingListCheckOffService(){
    var service = this;

    //List to Buy Items
    var toBuyItems=[
      {
         name:"Tomates",
         quantity:"3"
      },
      {
         name:"Bananas",
         quantity:"5"
      },
      {
         name:"Onions",
         quantity:"10"
      },
      {
         name:"Oranges",
         quantity:"12"
      },
      {
         name:"Apples",
         quantity:"17"
      },
    ];

    //List Already Buy Items
    var alreadyBuyItems=[];

    service.getToBuyItems = function(){
      return toBuyItems;
    };

    service.getAlredayBuyItems = function(){
      return alreadyBuyItems;
    };

    service.buyItem = function(indexItem){

     var item=toBuyItems[indexItem];

     //Remove this item to toBuyItems List
     toBuyItems.splice(indexItem,1);

     //Add this item to alreadyBuyItems List
     alreadyBuyItems.push(item);

    };

  };

})();
