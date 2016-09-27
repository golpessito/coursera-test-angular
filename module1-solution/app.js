(function(){
  'use strict';

  angular.module('DIApp',[])

  .controller('LunchCheckController',LunchCheckController);

  LunchCheckController.$inject=['$scope'];

  function LunchCheckController($scope){

    $scope.name="";
    $scope.resultItems="";

    $scope.checkItems = function() {

      var myItems=$scope.name;
      var myResult="";

      if(myItems.length==0){
        myResult="Please enter data first";
      }
      else if(myItems.split(",").length<=3){
        myResult="Enjoy!";
      }
      else{
        myResult="Too much!";
      }

      $scope.resultItems=myResult;
    };

  }

})();
