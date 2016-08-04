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
        alert("hello");
       var username =  document.getElementById('username').value;
            var password = document.getElementById('password').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
       
            $http({ 
                    method: 'POST',
                    url: 'https://api.mongolab.com/api/1/databases/vikas2/collections/users?apiKey=HxPILPvmcIj3SyZBMlrPV38t7_BiBKUJ',
                data: JSON.stringify({
                                
                            name: username,
                            password: password,
                            email: email,
                            phone: phone
            }),
                contentType: "application/json"
                
    }).success(function (){
            alert("successfully registered");
    });

            

            

    					};

   
    
	
    
})



.controller('login', function ($scope,$http) {

    
    $scope.login = function () {
        
       var username =  document.getElementById('username2').value;
            var password = document.getElementById('password2').value;
        
            
                    
                
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
            


           
            
            
            
    					};
	    
})



.controller('location', function ($scope,$http) {

    
    $scope.stateChanged = function () {
        alert("ok");
        
       //var item = document.getElementById('Item').value;
    var state = document.getElementById('state').value;
        alert(state);
//var name="one.xml";
//var url = "http://www.SupermarketAPI.com/api.asmx/SearchForItem?APIKEY=abb0645e0a&StoreId="+storeid+"&ItemName="+item;
//downloadURI();
//setTimeout(read, 6000);
        function ajaxRequest(){
 var activexmodes=["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"]; //activeX versions to check for in IE
 if (window.ActiveXObject){ //Test for support for ActiveXObject in IE first (as XMLHttpRequest in IE7 is broken
  for (var i=0; i<activexmodes.length; i++){
   try{
    return new ActiveXObject(activexmodes[i]);
   }
   catch(e){
    //suppress error
   }
  }
 }
 else if (window.XMLHttpRequest) // if Mozilla, Safari etc
 {
     
  return new XMLHttpRequest();
 }
 else
  return false
}
read();
        
/*function downloadURI() 
{
    
    var link = document.createElement("a");
    link.download = name;
    link.href = url;
    link.click();
}*/
function read(){
 
var mygetrequest=new ajaxRequest();
if (mygetrequest.overrideMimeType){
 mygetrequest.overrideMimeType('text/xml');
 }
mygetrequest.onreadystatechange=function(){
 if (mygetrequest.readyState==4){
     
  if (mygetrequest.status==200 || window.location.href.indexOf("http")==-1){
   var xmldata=mygetrequest.responseXML //retrieve result as an XML object
         
           myFunction(xmldata);
  }
     else
     {
         alert("An error has occured making the request")
  }
 }
}
mygetrequest.open("GET", "http://www.SupermarketAPI.com/api.asmx/CitiesByState?APIKEY=abb0645e0a&SelectedState="+state, true);
mygetrequest.send();
function myFunction(xmlDoc) {
 
var x1 = xmlDoc.getElementsByTagName("City");
    $scope.cities = new Array(x1.length);
$scope.city = x1;
var x2 ="";
    for( var i = 0;i<($scope.city.length);i++){
            x2 = x2 + $scope.city[i].childNodes[0].nodeValue + " ";
            $scope.cities[i] = $scope.city[i].childNodes[0].nodeValue;
    }
    //$scope.city = x2;
    alert(x2);
    

}	
        
        
        
}
            
    					}.bind($scope);

   
    
	
    
})
.controller('mapoutput', function ($scope,$http) {

    var map;
    var map_spec;
    var directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true
    });
    var directionsService = new google.maps.DirectionsService();
    var latitude;
    var longitude;
    var pos_geo;
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
        
        
        if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
       pos_geo = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      alert(pos_geo.lat + " " +pos_geo.lng);
    });
  } else {
    // Browser doesn't support Geolocation
    alert("not able to get geo location");
  }

        var start = new google.maps.LatLng(pos_geo.lat, pos_geo.lng);
         alert(start);      
            var end =  localStorage.getItem("city")+" "+localStorage.getItem("state")+" "+localStorage.getItem("zip");
            alert(localStorage.getItem("city")+" "+localStorage.getItem("state")+" "+localStorage.getItem("zip"));
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
                else{
                alert("there is a problem");
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

