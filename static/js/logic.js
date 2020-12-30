//create basemap for the earthquakes
var myMap = L.map("map", {
  center: [40.4759, -96.4001],
  zoom: 5,
});

//add intital tile layer for cities
var initialLayer = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: "pk.eyJ1IjoiY3BhdHRlcnNvbjcxIiwiYSI6ImNraWpwMGN5MTAyMWoycnJ4djNpYWNyYWYifQ.1dizzjUS_t5Gumt2S4vITQ",
}).addTo(myMap)

//import json data from USGS
//example site for parsed data https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson

var quakelink = "static/data/earthquake.geojson";
var geoJsonQuake = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//Function to determine radius of earthquake marker based on earthquake magnitude
function quakeRadius(magnitude) {
  if (magnitude == 0) {
      return 1
    };
  return magnitude * 4;
};

// Function to determine the color of the earthquake based on its magnitude
function chooseColor(magnitude) {
  switch (true) 
  {
    case magnitude > 5:
      return "red";
    case magnitude > 4:
      return "orange";
    case magnitude > 3:
      return "yellow";
    case magnitude > 2:
      return "green";
    case magnitude > 5:
      return "blue";
    default:
      return "purple";
  }
};

//Function to format circle marker for each earthquake
function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 0.75,
    fillColor: chooseColor(feature.properties.mag),
    color: "#000000",
    radius: quakeRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  }
};

//Able to get data need to add the layers
//Create layer groups for control chekcboxes
var quakeLayer = new L.LayerGroup() 
var plateLayer = new L.LayerGroup() 

//Earthquake Data
d3.json(geoJsonQuake, function (data) {
  console.log(data);

  //Add geoJson layer
  L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },
    style: styleInfo,
    onEachFeature: function (feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br> + Location: " + feature.properties.place);
    }
  }).addTo(quakeLayer)

  //Add earthquake layer to map
  quakeLayer.addTo(myMap)

  //Add a legend
  var legend = L.control({position: "bottomright"});

  legend.onAdd = function() {
        //Add legend details
        var div = L.DomUtil.create("div", "info legend");
        var grades = [0, 1, 2, 3, 4, 5];
        var colors = ["purple","blue","green","yellow","orange","red" ];

        //Looping through the intervals to generate a label with a colored square for each interval.
        for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
            "<i style='background: " + colors[i] + "'></i> " +
            grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
          }
        return div;
      };
  legend.addTo(myMap);
});

//Add basemap options
var TerrainBackground = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}{r}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 18,
  ext: 'png'
});

var topography = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  maxZoom: 17,
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

//Create basemaps for control
var baseMaps = {
  Country: initialLayer,
  Terrain: TerrainBackground,
  Topography: topography,
  Street: street,
  Satellite: WorldImagery
};

//Create overlaymaps for control
var overlayMaps = {
        Earthquakes : quakeLayer
      };
      
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap)
