// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('register', function ($scope,$http) {

    
    $scope.register = function () {
        
       var username =  document.getElementById('username').value;
            var password = document.getElementById('password').value;
        var email = document.getElementById('email').value;

        if(username==""||password==""||email=="")
        {
            $http({ 
                    method: 'POST',
                    url: 'https://api.mongolab.com/api/1/databases/vikas2/collections/users?apiKey=HxPILPvmcIj3SyZBMlrPV38t7_BiBKUJ',
                data: JSON.stringify({
                                
                            name: username,
                            password: password,
                            email: email
            }),
                contentType: "application/json"
                
    }).success(function (){
            alert("successfully registered");
    });

         }
    else
        {
            alert("please enter all the fields")
        }    

            

    					};

   
    
	
    
})



.controller('login', function ($scope,$http) {

    
    $scope.login = function () {
        
       var username =  document.getElementById('username2').value;
            var password = document.getElementById('password2').value;
        
            if(username==""||password=="")
        {
                    
                
            $http({ 
                    method: 'GET',
                    url: 'https://api.mongolab.com/api/1/databases/vikas2/collections/users?apiKey=HxPILPvmcIj3SyZBMlrPV38t7_BiBKUJ'
                }).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
                var users=response.data;
                //alert(users.length + " " + users[0].name);
                
                var i;
                var flag=0;
                for(i=0;i<users.length;i++)
                {
                    if(username==users[i].name)
                    {
                       if(password==users[i].password)
                       {
                        
                           
                           alert("login successful");
                           flag=1;
                           localStorage.setItem("username", username);
                           window.location.assign("home.html")
                           break;
                           
                       }
                    }
                }
                if(flag==0)
                     alert("Incorrect username, password combination.");
                //alert(JSON.stringify(response.data[0]));
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
            


            }
    else
        {
            alert("please enter all the fields")
        }
            
            
            
    					};
	    
})


.controller('mapoutput', function ($scope,$http) {

    var map;
    var map_spec;
    var directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true
    });
    var directionsService = new google.maps.DirectionsService();

    $scope.initialize = function () {
          var pos = new google.maps.LatLng(0, 0); 
          var map_spec = {
                zoom: 3,
                center: pos
            };

            map = new google.maps.Map(document.getElementById('map-canvas'),
            map_spec);
     };
    $scope.findOutMap = function () {
        
       var start = "kansas city, rockhill road, 64110";
            var end = localStorage.getItem("city");
            var request = {
                origin: start,
                destination: end,
                travelMode: google.maps.TravelMode.DRIVING
            		};

            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setMap(map);
                    directionsDisplay.setDirections(response);
                    console.log(status);
                						}
           
        								});
		var distance = new google.maps.DistanceMatrixService;
	distance.getDistanceMatrix({
    origins: [start],
    destinations: [end],
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false
  				}, function(response, status) {
								
    							if (status !== google.maps.DistanceMatrixStatus.OK) {
      							alert('Error was: ' + status);
    													     } 
													     else {
															
      															var originList = response.originAddresses;
      															var destinationList = response.destinationAddresses;
      															var outputDiv = document.getElementById('output_distance');
															
      															outputDiv.innerHTML = '';
															
      															
															
															var results = response.rows[0].elements;
															
															outputDiv.innerHTML = originList + '       to       ' + destinationList +
              															':           ' + results[0].distance.text +  '<br>';
    														    };

    
								});






	


	
                
                     

				
          





    					};

	google.maps.event.addDomListener(window, 'load', $scope.initialize);

    
});


