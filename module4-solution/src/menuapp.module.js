(function(){
  'use strict';

  angular.module('MenuApp',['data'])
  .controller('MenuDataController',MenuDataController)
  .service('MenuDataService',MenuDataService)
  .component('categories', {
    templateUrl:'src/categories.template.html',
    controller:CategoriesComponentController,
    bindings:{
      categories:'<',
      getItemsForCategory:'&',
    }
  });

  function CategoriesComponentController(){
    var $ctrl=this;

  }

  // CONTROLLER //
  MenuDataController.$inject=['MenuDataService'];
  function MenuDataController(MenuDataService){
    var list=this;
    list.categories=[];
    var promise=MenuDataService.getAllCategories();

    promise.then(function(response){
      list.categories=response.data;
    })
    .catch(function(error){
      console.log("BIG ERROR CATEGORIES");
    });

    list.getItemsForCategory=function(shortName){
      console.log("We are in getItemsForCategory");
      var promise=MenuDataService.getItemsForCategory(shortName);

      promise.then(function(response){
        console.log(response.data);
      })
      .catch(function(){
        console.log("BIG ERROR IN ITEMS");
      });
    }

  };

  // SERVICE //

    MenuDataService.$inject=['$http']
    function MenuDataService($http){
      var service=this;

      service.getAllCategories=function(){
        var response=$http({
          method:"GET",
          url:("https://davids-restaurant.herokuapp.com/categories.json")
        });

        return response;
      };

      service.getItemsForCategory=function(categoryShortName){
        var response=$http({
          method:"GET",
          url:(" https://davids-restaurant.herokuapp.com/menu_items.json"),
          params:{
            category:categoryShortName
          }
        });

        return response;
      };

    };

  // COMPONENT //

})();
