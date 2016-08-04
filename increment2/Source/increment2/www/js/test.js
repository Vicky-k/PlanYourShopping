describe('login', function(){
    var scope;//we'll use this scope in our tests
 var state;
    //mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('starter'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function($rootScope, $controller,$state){
        //create an empty scope
        scope = $rootScope.$new();
       state=$state;
        //declare the controller and inject our empty scope
        $controller('login', {$scope: scope},{$state: state});
    }));
     it('tests function of login', function()
    {
        // expect(2).toEqual(2);  
         expect(scope.username2).not.toEqual(''));
         expect(scope.password2).not.toEqual(''));
         
     });
});