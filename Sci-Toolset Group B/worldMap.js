/// ALOT OF THIS FILE IS A FORM OF TESTING MAP MANIPULATION.
/// THIS WILL NO DOUBT HAVE TO ADAPT TO REACT'S IMPLEMENTATION

function main() {
  if ('geolocation' in navigator) 
{
  console.log('Geolocation available');
  navigator.geolocation.getCurrentPosition(position => {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  console.log(lat, lon);
  document.getElementById('latitude').textContent = lat;
  document.getElementById('longitude').textContent = lon;
  var polyLatLngs = [];
  var clickCount = 0;

  // L. from Leaflet                
  const mymap = L.map('mymap').setView([lat, lon], 15);
  const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const tiles = L.tileLayer(tileUrl, { attribution });
  tiles.addTo(mymap);
  
  //var allMapLayers = [];
  
  const myStyle = { "color": "#222222", "weight": 1, "opacity": 0.9 }

  let flightPolygon = L.geoJSON(returnCoordsFromFlight(), {color: 'red'}).addTo(mymap);

  console.log("I've reached here!")
  
  DisplayPolygonButtons(mymap);
});
} 
else 
{
  console.log('Geolocation not available');
} }

// DO NOT DELETE, USE FOR REFERENCE!
function getSampleGeoJSONArray()
{
  var geojson1 = 
  {
    "type": "Feature",
    "geometry": {
      "type": "Polygon",
      "coordinates": 
        [[ [-5.000, 50.000], [-4.000, 50.000], [-4.000, 51.000], [-5.000, 51.000] ]]     
    },
    "properties": {
      "name": "Big Square, Fam",
      "popupContent": "This is where the Rockies play!"
    }
  };
  var geojson2 = 
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [-5.515, 51.913]
    },
    "properties": {
      "name": "Somewhere int' sea"
    }
  };
  var geojson3 = 
  {
    "type": "Feature",
    "geometry": {
      "type": "LineString",
      "coordinates": [[-5.18, 51.958],[-5.50, 51.958],[-5.500, 52.000]]
    },
    "properties": {
      "name": "Line of truth"
    }
  };
  var geojson4 = 
  {
    "type": "Feature",
    "geometry": {
      "type": "MultiPolygon",
      "coordinates":
      [[[[0.1278,51.5074], [1.000, 51.5074], [1.000, 52.000]]],
      [[[0.1178,51.5000], [0.1180,51.5000], [0.1180,51.5020]]]]
    },
    "properties": {
      "name": "MultiPolywannacracker"
    }
  };

  var geojsons = [geojson1, geojson2, geojson3, geojson4];
 return geojsons;
}

function getSampleGeoJSON(number)
{
  var geojson1 = 
  {
    "type": "Feature",
    "geometry": {
      "type": "Polygon",
      "coordinates": 
        [[ [-5.000, 50.000], [-4.000, 50.000], [-4.000, 51.000], [-5.000, 51.000] ]]     
    },
    "properties": {
      "name": "Big Square, Fam",
      "popupContent": "This is where the Rockies play!"
    }
  };
  var geojson2 = 
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [-5.515, 51.913]
    },
    "properties": {
      "name": "Somewhere int' sea"
    }
  };
  var geojson3 = 
  {
    "type": "Feature",
    "geometry": {
      "type": "LineString",
      "coordinates": [[-5.18, 51.958], [-5.50, 51.958], [-5.500, 52.000]]
    },
    "properties": {
      "name": "Line of truth"
    }
  };
  var geojson4 = 
  {
    "type": "Feature",
    "geometry": {
      "type": "MultiPolygon",
      "coordinates":
      [[[[0.1278,51.5074], [1.000, 51.5074], [1.000, 52.000]]],
      [[[0.1178,51.5000], [0.1180,51.5000], [0.1180,51.5020]]]]
    },
    "properties": {
      "name": "MultiPolywannacracker"
    }
  };

  var geojsons = [geojson1, geojson2, geojson3, geojson4];
  var arraySize = geojsons.length;
  if(number <= (arraySize))
  {
    return geojsons[number-1];
  }
  else return null;
}

function DisplayPolygonButtons(mymap)
{
  var index = 0;

  var testarray = [[51.958, -5.18], [51.958, -5.50],[52.000, -5.500]];
  //var testarray = returnCoordsFromFlight();
  //var flightPath = returnCoordsFromFlight();

  var changeFlightPathDisplayButton = L.easyButton({
    states:[{
      stateName: 'zoom-to-flight',
      icon: 'fa-tree',
      title: 'Zoom to the specific Flight',
      onClick: function(btn, map){
        mymap.setZoom(12);
        mymap.setView(testarray[index]);
        console.log(index);
        btn.state('zoom-to-next-flight');
        index++;
        if (index == 3)
        {
          index = 0;
        }
      }
    },{
      stateName: 'zoom-to-next-flight',
      icon: 'fa-tree',
      title: 'zoom to the next flight',
      onClick: function(btn, map){
        mymap.setZoom(12);
        mymap.setView(testarray[index]);
        btn.state('zoom-to-flight');
      }
  }]
});

changeFlightPathDisplayButton.addTo(mymap); 
}

function returnCoordsFromFlight()
{

  //var flightString = "[[-5.509,51.913],[-5.515,51.913],[-5.518,51.958],[-5.511,51.958],[-5.51,51.958],[-5.505,51.958],[-5.497994,51.958876],[-5.498,51.959],[-5.497,51.959],[-5.491,51.959],[-5.485,51.959],[-5.484,51.959],[-5.478,51.959],[-5.472,51.959],[-5.471,51.959],[-5.465,51.959],[-5.459,51.959],[-5.452,51.96],[-5.446,51.96],[-5.445,51.96],[-5.439,51.96],[-5.438,51.96],[-5.433,51.96],[-5.432,51.96],[-5.426,51.96],[-5.425,51.96],[-5.42,51.96],[-5.419,51.96],[-5.413,51.96],[-5.412,51.96],[-5.406,51.96],[-5.399991,51.960858],[-5.4,51.961],[-5.399,51.961],[-5.393,51.961],[-5.387,51.961],[-5.386,51.961],[-5.38,51.961],[-5.374,51.961],[-5.373,51.961],[-5.367,51.961],[-5.366,51.961],[-5.361,51.961],[-5.353994,51.961876],[-5.354,51.962],[-5.353,51.962],[-5.348,51.962],[-5.347,51.962],[-5.341,51.962],[-5.34,51.962],[-5.334,51.962],[-5.328,51.962],[-5.327,51.962],[-5.321,51.962],[-5.315,51.962],[-5.314,51.962],[-5.308,51.962],[-5.301991,51.962858],[-5.302,51.963],[-5.301,51.963],[-5.294,51.963],[-5.292,51.918],[-5.299,51.918],[-5.305,51.918],[-5.312006,51.917124],[-5.312,51.917],[-5.313,51.917],[-5.318,51.917],[-5.319,51.917],[-5.325,51.917],[-5.326,51.917],[-5.331,51.917],[-5.332,51.917],[-5.338,51.917],[-5.339,51.917],[-5.344,51.917],[-5.345,51.917],[-5.351,51.917],[-5.358,51.916],[-5.364,51.916],[-5.365,51.916],[-5.371,51.916],[-5.377,51.916],[-5.378,51.916],[-5.384,51.916],[-5.39,51.916],[-5.391,51.916],[-5.397,51.916],[-5.403,51.916],[-5.410006,51.915124],[-5.41,51.915],[-5.411,51.915],[-5.416,51.915],[-5.417,51.915],[-5.423,51.915],[-5.424,51.915],[-5.429,51.915],[-5.43,51.915],[-5.436,51.915],[-5.437,51.915],[-5.443,51.915],[-5.449,51.915],[-5.456,51.914],[-5.462,51.914],[-5.463,51.914],[-5.469,51.914],[-5.475,51.914],[-5.476,51.914],[-5.482,51.914],[-5.488,51.914],[-5.489,51.914],[-5.495,51.914],[-5.496,51.914],[-5.501,51.914],[-5.508006,51.913124],[-5.508,51.913],[-5.509,51.913]]";
  //console.log(flightString);
  //let testArray = flightString
  let flightPath = [[-5.509,51.913],[-5.515,51.913],[-5.518,51.958],[-5.511,51.958],[-5.51,51.958],[-5.505,51.958],[-5.497994,51.958876],[-5.498,51.959],[-5.497,51.959],[-5.491,51.959],[-5.485,51.959],[-5.484,51.959],[-5.478,51.959],[-5.472,51.959],[-5.471,51.959],[-5.465,51.959],[-5.459,51.959],[-5.452,51.96],[-5.446,51.96],[-5.445,51.96],[-5.439,51.96],[-5.438,51.96],[-5.433,51.96],[-5.432,51.96],[-5.426,51.96],[-5.425,51.96],[-5.42,51.96],[-5.419,51.96],[-5.413,51.96],[-5.412,51.96],[-5.406,51.96],[-5.399991,51.960858],[-5.4,51.961],[-5.399,51.961],[-5.393,51.961],[-5.387,51.961],[-5.386,51.961],[-5.38,51.961],[-5.374,51.961],[-5.373,51.961],[-5.367,51.961],[-5.366,51.961],[-5.361,51.961],[-5.353994,51.961876],[-5.354,51.962],[-5.353,51.962],[-5.348,51.962],[-5.347,51.962],[-5.341,51.962],[-5.34,51.962],[-5.334,51.962],[-5.328,51.962],[-5.327,51.962],[-5.321,51.962],[-5.315,51.962],[-5.314,51.962],[-5.308,51.962],[-5.301991,51.962858],[-5.302,51.963],[-5.301,51.963],[-5.294,51.963],[-5.292,51.918],[-5.299,51.918],[-5.305,51.918],[-5.312006,51.917124],[-5.312,51.917],[-5.313,51.917],[-5.318,51.917],[-5.319,51.917],[-5.325,51.917],[-5.326,51.917],[-5.331,51.917],[-5.332,51.917],[-5.338,51.917],[-5.339,51.917],[-5.344,51.917],[-5.345,51.917],[-5.351,51.917],[-5.358,51.916],[-5.364,51.916],[-5.365,51.916],[-5.371,51.916],[-5.377,51.916],[-5.378,51.916],[-5.384,51.916],[-5.39,51.916],[-5.391,51.916],[-5.397,51.916],[-5.403,51.916],[-5.410006,51.915124],[-5.41,51.915],[-5.411,51.915],[-5.416,51.915],[-5.417,51.915],[-5.423,51.915],[-5.424,51.915],[-5.429,51.915],[-5.43,51.915],[-5.436,51.915],[-5.437,51.915],[-5.443,51.915],[-5.449,51.915],[-5.456,51.914],[-5.462,51.914],[-5.463,51.914],[-5.469,51.914],[-5.475,51.914],[-5.476,51.914],[-5.482,51.914],[-5.488,51.914],[-5.489,51.914],[-5.495,51.914],[-5.496,51.914],[-5.501,51.914],[-5.508006,51.913124],[-5.508,51.913],[-5.509,51.913]]

  
  let geojson1 = 
  {
    "type": "Feature",
    "geometry": {
      "type": "Polygon",
      "coordinates": 
       [flightPath]
    },
    "properties": {
      "name": "FlightPathFromAPI",
      "popupContent": "This is a big list!"
    }
  };
  return geojson1;
}


function GetIndividualCoords()
{



  
}