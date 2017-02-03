(function(){

  angular.module('public')
  .service("SigupService",SigupService);

  SigupService.$inject=['$http','ApiPath'];
  function SigupService($http,ApiPath)
  {
    var service=this;

    var user={
      first_name:"",
      last_name:"",
      phone:"",
      email:"",
      dish:""
    };

    var item={}

    var userSignUp=false;

    service.user=user;
    service.item=item;
    service.userSignUp=userSignUp;

    service.getUser=function(){
      return service.user;
    };

    service.getItem=function(){
      return service.item;
    };

    service.getUserSignUp=function(){
      return service.userSignUp;
    };

    service.checkItem=function(shortName){
      var response=$http({
        method:"GET",
        url:(ApiPath+"menu_items/"+shortName+".json"),
      });

      return response;
    };

    service.setItem=function(myItem){
      service.item=myItem;
    }

    service.logUser=function(){
      console.log("FIRST NAME: "+user.first_name);
      console.log("LAST NAME: "+user.last_name);
      console.log("MAIL: "+user.email);
      console.log("PHONE: "+user.phone);
      console.log("DISH: ",service.item);
    };

  };

})();
