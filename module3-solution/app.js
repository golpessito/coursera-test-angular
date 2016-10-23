(function(){
  'use strict';

  angular.module('NarrowItDownApp',[]).
  controller('NarrowItDownController',NarrowItDownController).
  service('MenuSearchService',MenuSearchService).
  directive('foundItems', FoundItemsDirective);

  function FoundItemsDirective(){
    var ddo={
      templateUrl:'foundItems.html',
      scope:{
        items:'<',
        onRemove:'&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController:true
    };

    return ddo;
  };

  function FoundItemsDirectiveController(){
    var list=this;
  };

  NarrowItDownController.$inject=['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    var list=this;
    list.searchTerm="";
    list.itemNotFound="";

    list.getMatchedMenuItems=function(searchTerm){
      list.error=""
      var promise=MenuSearchService.getMatchedMenuItems(searchTerm);

      promise.then(function (response){
        //console.log(response.data);
        var foundItems=response.data.menu_items;
        list.found=[];
        if(searchTerm!=="")
        {
          for(var i=0; i<foundItems.length;i++){

            if(foundItems[i].description.indexOf(searchTerm)!==-1){
              var item={
                short_name:foundItems[i].short_name,
                description:foundItems[i].description
              }
            list.found.push(item);
            }
          }

          if(list.found.length===0){
            list.error="Nothing Found!";
          }
        }
        else{
          list.error="Nothing Found!";
        }
        
      })
      .catch(function (response){
        console.log("Something went terribly wrong!!");
      });
    };

    list.removeItem=function(index){
      list.found.splice(index,1);
    }
  };

  MenuSearchService.$inject=['$http'];
  function MenuSearchService($http){
    var service=this;

    service.getMatchedMenuItems=function(searchTerm){
      var response=$http({
        method:"GET",
        url:"https://davids-restaurant.herokuapp.com/menu_items.json"
      });

      return response;
    };
  };
})();
