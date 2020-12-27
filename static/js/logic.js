//basemap for html
var myMap = L.map("map", {
center: [30.2672, -97.7431],
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
