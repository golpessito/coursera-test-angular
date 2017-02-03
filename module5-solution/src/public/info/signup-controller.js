(function(){
  'use strict';

  angular.module('public')
  .controller('SignUpController', SignUpController);

  SignUpController.$inject=['SigupService'];
  function SignUpController(SigupService){

    var $ctrl=this;
    $ctrl.showInfo=false;
    $ctrl.user=SigupService.getUser();
    $ctrl.showErrorItem=false;
    $ctrl.userSignUp=false;

    $ctrl.submit=function()
    {
      var promise=SigupService.checkItem($ctrl.user.dish);

      promise.then(function resolve(response){
        $ctrl.showErrorItem=false;
        $ctrl.userSignUp=true;
        SigupService.setItem(response.data);
      },
      function reject(error){
        $ctrl.showErrorItem=true;
        $ctrl.userSignUp=false;
      });

    };

  };



})();
