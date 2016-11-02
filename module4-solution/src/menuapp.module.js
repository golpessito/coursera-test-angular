(function(){
  'use strict';

  angular.module('MenuApp',['data','ui.router'])
  .controller('MenuDataController',MenuDataController)
  .service('MenuDataService',MenuDataService)
  .component('categories', {
    templateUrl:'src/categories.template.html',
    controller:CategoriesComponentController,
    bindings:{
      categories:'<',
      getItemsForCategory:'&',
    }
  })
  .component('items',{
    templateUrl:'src/items.template.html',
    cnotroller:ItemsComponentController,
    bindings:{
      items:'<'
    }
  })
  .config(RoutesConfig);

  RoutesConfig.$inject=['$stateProvider','$urlRouterProvider'];

  function RoutesConfig($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/categories');

    //Set up UI state
    $stateProvider
    .state('categories',{
      url: '/categories',
      templateUrl:'categories.html'
    })
    .state('items',{
      url: '/items',
      templateUrl:'items.html'
    });

  }

  // COMPONENTS
  function ItemsComponentController(){
    $ctrl=this;
  }

  function CategoriesComponentController(){
    var $ctrl=this;

  }

  // CONTROLLER //
  MenuDataController.$inject=['MenuDataService'];
  function MenuDataController(MenuDataService){
    var list=this;
    list.categories=[];
    list.items=[];
    var promise=MenuDataService.getAllCategories();

    promise.then(function(response){
      list.categories=response.data;
    })
    .catch(function(error){
      console.log("BIG ERROR CATEGORIES");
    });

    list.getItemsForCategory=function(shortName){
      var promise=MenuDataService.getItemsForCategory(shortName);

      promise.then(function(response){
        list.items=response.data.menu_items;
        console.log(list.items);
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
