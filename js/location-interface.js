
var map;
var infoWindow;
var service;
var marker;
var pos;


//Map #1: .
function initialize() {
  var mapOptions = {
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: false,
    panControl: false,
    streetViewControl: false,
    mapTypeControl: false,
  };
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {

      pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      infoWindow = new google.maps.InfoWindow({map: map, position: pos, content: 'You Are Here'});

      var request = {location:pos, radius:5000, keyword: ['dispensary']};

      map.setCenter(pos);

      infoWindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request,callback);

    },

    function(){
      handleNoGeolocation(true);
    });
  } else {
    handleNoGeolocation(false);
  }

  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(place.name + '<br>' + place.address);
      infoWindow.open(map, this);
    });
  }
  google.maps.event.addListenerOnce(map, 'idle', function() {
    console.log("I AM A LOG");
    google.maps.event.trigger(map, 'resize');
});

}
google.maps.event.addDomListener(window, 'load', initialize);
