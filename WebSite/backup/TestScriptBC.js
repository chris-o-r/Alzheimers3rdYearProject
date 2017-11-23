
//Data for the map
 var lat=0;
 var lng=0;
 var uluru; //Holds lat and lng as a latlng literal
 var map;
 var marker;
 
//Data for the geoFence
 var geoFence;
 var fenceLat;
 var fenceLng;
 var fenceRadius;
 
//Used to search database(I think)
 var patients;
 var clientName;
 
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCFIrC0pPcCmMtv3E67-G1dYN8GvZhHfgE",
    authDomain: "alzheimers-project.firebaseapp.com",
    databaseURL: "https://alzheimers-project.firebaseio.com",
    projectId: "alzheimers-project",
    storageBucket: "alzheimers-project.appspot.com",
    messagingSenderId: "968345670861"
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  
  const preObject = document.getElementById('object');
  var dbRefObject = firebase.database().ref("Patients");
  dbRefObject.on('value',gotLocation,errData);
 
 function startUp(){geoMap()};
 
 
  function initMap() {
		//getLocation();
        uluru = {lat, lng};
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: uluru
        });
        marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
		marker.setDraggable(true);
		updateMap();
      };
  
   function updateMap(){
	  map.setCenter(uluru);
      marker.setPosition(uluru);
  };
  
  function geoMap(){
	var ref = firebase.database().ref("Patients").once('value', gotGeoMap, errData);
	console.log(geoFence);
	var cityCircle = new google.maps.Circle({
      strokeColor: '#99c0ff',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#99c0ff',
      fillOpacity: 0.35,
      map: map,
      center: geoFence,
      radius: fenceRadius,
    });
  };
  
  /*function getGeoMap(){
	  var ref = firebase.database().ref("Patients");
	  ref.once('value', gotGeoMap, errData);
	  //firebase.database().ref("Patients").once('value', gotGeoMap, errData);
  }*/
  
  function gotGeoMap(snapshot){
	var geoData = snapshot.val();
	
	fenceLat = geoData.Patient1.GeoFence.lat;
	fenceLng = geoData.Patient1.GeoFence.lng;
	fenceRadius = geoData.Patient1.GeoFence.radius;
	
	fenceLat = parseFloat(fenceLat);
	fenceLng = parseFloat(fenceLng);
	geoFence = {lat:fenceLat, lng:fenceLng};
	console.log(geoFence);
  }
  
  function getLocation(){
    firebase.database().ref("Patients").once('value', gotLocation, errData);
  };
    

function gotLocation(snapshot){
	var locData = snapshot.val();
	
	lat = locData.Patient1.Location.lat;
	lng = locData.Patient1.Location.lng;
	
	lat = parseFloat(lat);
    lng = parseFloat(lng);
	
	uluru = {lat:lat, lng:lng};
	updateMap();
	//printPatientInfo();
	
};

function printPatientInfo(){
	var x = document.getElementById("info");
	x.innerHTML=clientName;
}

function errData(err){
    console.log("error");
};
   // add stuff to databse
    /*var ref = firebase.database().ref();
	var s = ref.child("Ayy").set("lmao");*/ 
  
  // maps api key AIzaSyCaCRlJoJoo8eUMEH0lykgdSQfeRPN_yFg
  
  
  //Spaghetti below, Bon Appetit!
  
  //initMap();
    /*patients = data.val();
    keys = Object.keys(patients);
    k = keys[0];
	clientName = patients[k].Name;
	console.log(clientName);
    lat = patients[k].Location.lat;
    lng = patients[k].Location.lng;
	document.getElementById("head").innerHTML = clientName+"s' location";
    lat = parseFloat(lat);
    lng = parseFloat(lng);
    //console.log(lat,lng);
    uluru = {lat,lng};
    updateMap();
	printPatientInfo();
	//initMap();*/