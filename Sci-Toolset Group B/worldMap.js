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
  
  var allMapLayers = [];
  
  var myStyle = { "color": "#222222", "weight": 1, "opacity": 0.9 };
  mymap.on('click', function(e)
  {
    clickCount ++;

    console.log(e);
    console.log(e.latlng);
    var mouseCoords = e.latlng;

    var sampleJSON = getSampleGeoJSON(clickCount);
    switch (clickCount){
      case 1:
        myStyle = { "color": "#222222", "weight": 1, "opacity": 0.9 };
        break;
      case 2:
        myStyle = { "color": "#FF0000", "weight": 1, "opacity": 0.9 };
        break;
      case 3:
        myStyle = { "color": "#FF0000", "weight": 1, "opacity": 0.9 };
        break;
      case 4:
        myStyle = { "color": "#0000ff", "weight": 1, "opacity": 0.9 };
        break;
      case 5:
         for(i = 0; i < allMapLayers.length; i++) { mymap.removeLayer(allMapLayers[i]); }
        allMapLayers.length = 0;
        break;
      default:
        break;
    }
    var jsonLayer;
    if(sampleJSON != null)
    {
      jsonLayer = L.geoJSON(sampleJSON, {style: myStyle}).addTo(mymap);
      allMapLayers.push(jsonLayer);
      console.log("Current number of layers" + allMapLayers.length)
      //mymap.fitBounds(jsonLayer.getBounds());
    }
    if(clickCount == 5) clickCount = 0;
    // Drops a pin at the clicked location
    // var newMarker = L.marker([mouseCoords.lat, mouseCoords.lng]).addTo(this);
    
    // Lets the user draw a polygon using mouse clicks
    // polyLatLngs.push(mouseCoords);
    // var polygon = L.polygon(polyLatLngs, {color: 'red'}).addTo(this);

    // Draws an image at the clicks location
    //var imageUrl = 'https://placekitten.com/g/200/300',
    //imageBounds = [e.latlng, [e.latlng.lat+0.005, e.latlng.lng+0.005]];
    //L.imageOverlay(imageUrl, imageBounds).addTo(this);

  })
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