//basemap for html
var myMap = L.map("map", {
  center: [40.4759, -96.4001],
  zoom: 5,
});

//added tilelayer for cities
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: "pk.eyJ1IjoiY3BhdHRlcnNvbjcxIiwiYSI6ImNraWpwMGN5MTAyMWoycnJ4djNpYWNyYWYifQ.1dizzjUS_t5Gumt2S4vITQ",
}).addTo(myMap);

//import json data from USGS
// site for parsed data https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

//able to get data need to add the layers
d3.json(url, function(response){
  //console.log(response);
  
//first layer is the coordinates
  for (var i=0; i <response.length; i++){
    var location = response[i].location;

    if (location) {
      L.marker([location.geometry.coordinates[1], location.geometry.coordinates[0]]).addTo(myMap);
    }
  console.log(location);
}
});

  

 


//second layer is the magnitude


//final is to add the legend

  // earthquake.forEach(d => {
  //   var depth = d.geometry.coordinates[2];
  //   console.log(depth)
