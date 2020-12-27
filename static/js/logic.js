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

d3.json(url).then(response=> {
  var eventQuake = response.features
  console.log("events", eventQuake)

  eventQuake.forEach(d =>{
    var depth = d.geometry.coordinates[2]

    var earthColor;
    if (d.properties.mag > 7){
      earthColor = "#5F0F40"}
      else if (d.prperties.mag > 6){
        earthColor = "#9A031E"}
      else if (d.properties.mag > 5){
        earthColor = "#A94A0F"}
      else if (d.properties.mag > 4){
        earthColor = "#F88B24"}
      else if (d.properties.mag > 3){
        earthColor = "#0F4C5C"}
      else {
        earthColor = "#757575"}
      });

    var magMulti;
    if (d.properties.mag >7){
      magMulti = d.properties.mag * 70000}
      else if (d.properties.mag >6){
        magMulti = d.properties.mag * 60000}
      else if (d.properties.mag >5){
       magMulti = d.properties.mag * 50000}
      else if (d.properties.mag >4){
        magMulti = d.properties.mag * 40000}
      else if (d.properties.mag >3){
        magMulti = d.properties.mag * 30000}
      else {
        magMulti = d.properties.mag * 20000}
      }
    };
  };
});