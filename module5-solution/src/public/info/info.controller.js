(function(){
  'use strict';

  angular.module('public')
  .controller('InfoController',InfoController);

  InfoController.$inject=['SigupService'];
  function InfoController(SigupService){
    var $ctrl=this;
    $ctrl.user=SigupService.getUser();
    $ctrl.userSignUp=false;

    if($ctrl.user.dish!=="")
    {
      $ctrl.user=SigupService.getUser();
      $ctrl.item=SigupService.getItem();
      $ctrl.userSignUp=true;
    }
    else{
      $ctrl.userSignUp=false;
    }

  }

})();
