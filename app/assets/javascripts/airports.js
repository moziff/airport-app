$(".airports .index").ready(function(){

  // DISABLE FORM SUBMISSION
  $('form').submit(function (event) {
    event.preventDefault();
  });

  // MAP DIV
  var map;
  function initMap() {
    var customMapType = new google.maps.StyledMapType([
      { "stylers": [
        { "hue": "#ff1a00" },
        { "invert_lightness": true },
        { "saturation": -100 },
        { "lightness": 33 },
        { "gamma": 0.5 }
        ]},
      { "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
          "color": "#2D333C"
          }]
      }
    ]);
    var customMapTypeId = 'custom_style';
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.0902, lng: -95.7129},
      mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
        },
      zoom: 3,
      disableDefaultUI: true
    });
    map.mapTypes.set(customMapTypeId, customMapType);
    map.setMapTypeId(customMapTypeId);
  }

  // Map canvas responsive to screen
  $("#canvas").css('height', window.innerHeight)

  // INITIALIZE THE MAP
  initMap();

  $('#calculate').click(function () {
    airport1 = $('#first_airport').val();
    airport2 = $('#second_airport').val();
    $.get('/airport_search/' + airport1 + '/' + airport2 )
      .success(function(data) {
        airportOneLatitude = data.airport1.latitude;
        airportOneLongitude = data.airport1.longitude;
        airportTwoLatitude = data.airport2.latitude;
        airportTwoLongitude = data.airport2.longitude;
        distance = geoDistance(airportOneLatitude, airportTwoLatitude, airportOneLongitude, airportTwoLongitude);
        // GEODISTANCE CALCULATION FUNCTION
        $('#calculated-distance').html('<div id="answer">' + data.airport1.airport + " is "
                                              + Math.round(distance) + ' nautical miles from '
                                              + data.airport2.airport + '</div>')
        // SET MARKERS ON MAP
        for (var i in data) {
          var marker = new google.maps.Marker({
            position: {
              lat: data[i].latitude,
              lng: data[i].longitude
            },
            id: data[i].id,
            icon: "http://s31.postimg.org/93ss428c7/airport.png",
            airport: data[i].airport,
            airport_code: data[i].airport_code,
            city: data[i].city,
            content: '<div id="content"><h5>'
                     + data[i].airport + '<br>'
                     + data[i].city + '</h5></div>'
          });
          // SET LISTENER ON MARKERS
          var infowindow = new google.maps.InfoWindow({});
          marker.addListener('click', function() {
            infowindow.setContent(this.content);
            infowindow.open(map, this);
          });
          marker.setMap(map);
        }
        // DRAW LINE BETWEEN AIRPORTS
        var distanceCoordinates = [
          {lat: airportOneLatitude, lng: airportOneLongitude},
          {lat: airportTwoLatitude, lng: airportTwoLongitude},
        ];
        var flightPath = new google.maps.Polyline({
          path: distanceCoordinates,
          geodesic: true,
          strokeColor: '#940000',
          strokeOpacity: 0.9,
          strokeWeight: 5
        });
        // SET FLIGHT PATH
        flightPath.setMap(map);
      })
  });
  function geoDistance(lat1, lat2, lon1, lon2) {
    var mean_radius = 6371; // kilo-metres
    var firstLat = toRad(lat1);
    var secondLat = toRad(lat2);
    var deltaLat = toRad((lat2-lat1));
    var deltaLong = toRad((lon2-lon1));

    var haversine = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
            Math.cos(firstLat) * Math.cos(secondLat) *
            Math.sin(deltaLong/2) * Math.sin(deltaLong/2);
    var formula = 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1-haversine));

    var distanceKM = mean_radius * formula;
    var nautical_miles = distanceKM * 0.539957
    return nautical_miles
  }

  function toRad(point) {
    return point * Math.PI / 180;
  }
});
