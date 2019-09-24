// Creating map object
var myMap = L.map("map", {
  center: [40.7128, -74.0059],
  zoom: 3
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// Link to GeoJSON
var APILink = "http://data.beta.nyc//dataset/d6ffa9a4-c598-4b18-8caf-14abde6a5755/resource/74cdcc33-512f-439c-" +
"a43e-c09588c4b391/download/60dbe69bcd3640d5bedde86d69ba7666geojsonmedianhouseholdincomecensustract.geojson";

var geodata = "static/js/countries.geojson";
var geojson;
var info = L.control();
 //var countriesData = geodata.features;
// TODO:

function getColor(){
  n = Math.floor(Math.random() * 6); 
  //console.log("random n",n);
  return n == 0 ? '#f7fcf5' :
	       n == 1 ? '#e5f5e0' :
	       n == 2 ? '#c7e9c0' :
	       n == 3 ? '#a1d99b' :
	       n == 4 ? '#41ab5d' :
	       n == 5 ? '#238b45' :
	       n == 6 ? '#006d2c' :
	               '#00441b' ;
};

function style(feature) {
 // console.log("random color",getColor());
  return {
    fillColor: getColor(),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7
  };
}

function highlightFeature(e) {
	var layer = e.target;

	layer.setStyle({
		weight: 5,
		color: '#666',
		dashArray: '',
		fillOpacity: 0.7
	});

	if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		layer.bringToFront();
  }
  info.update(layer.feature.properties);
}

function resetHighlight(e) {
  geojson.resetStyle(e.target);
  info.update();
}

function onEachFeature(feature, layer) {
	layer.on({
		mouseover: highlightFeature,
		mouseout: resetHighlight
		// click: zoomToFeature
	});
}

// Grab data with d3
d3.json(geodata, function(response){
  // Create a new choropleth layer
  console.log(response);
 //L.geoJson(response).addTo(myMap);
    // Define what  property in the features to use

    // Set color scale

    // Number of breaks in step range

    
    geojson = L.geoJson(response, {
      style: style,
      onEachFeature: onEachFeature
    }).addTo(myMap);
    // q for quartile, e for equidistant, k for k-means

    // Binding a pop-up to each layer

  // Set up the legend

    // Add min & max

  // Adding legend to the map

  

  info.onAdd = function (myMap) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
  };
  
  // method that we will use to update the control based on feature properties passed
  info.update = function (props) {
    var text  = '<h4>Country Name</h4>' + (props ?'<b>' + props.ADMIN + '</b><br />' : 'Hover over a country');
    console.log("html",text)
    this._div.innerHTML = text;
    //+ '<b>' + props.features.ADMIN + '</b><br />' 



    //console.log("country object", props)
    //console.log("country name", props.ADMIN)
   
  };
  
  info.addTo(myMap);

});