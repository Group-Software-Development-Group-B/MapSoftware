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

  mymap.on('click', function(e)
  {
    console.log(e);
    console.log(e.latlng);
    var mouseCoords = e.latlng;

    // Drops a pin at the clicked location
    // var newMarker = L.marker([mouseCoords.lat, mouseCoords.lng]).addTo(this);
    
    // Lets the user draw a polygon using mouse clicks
    // polyLatLngs.push(mouseCoords);
    // var polygon = L.polygon(polyLatLngs, {color: 'red'}).addTo(this);

    // Draws an image at the clicks location
    //var imageUrl = 'https://placekitten.com/g/200/300',
    //imageBounds = [e.latlng, [e.latlng.lat+0.005, e.latlng.lng+0.005]];
    //L.imageOverlay(imageUrl, imageBounds).addTo(this);

    var sampleJSON = getSampleGeoJSONArray();
    var jsonLayer = L.geoJSON(sampleJSON)
    
    jsonLayer.addTo(mymap);
  })
});
} 
else 
{
  console.log('Geolocation not available');
} }

function getSampleGeoJSONArray()
{
  var geojson1 = 
  {
    "type": "Feature",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
          [100.0, 1.0], [100.0, 0.0] ]
        ]
    },
    "properties": {
      "name": "Dinagat Islands"
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
      "name": "Dinagat Islands"
    }
  };
  var geojson3 = 
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [-5.18, 51.958]
    },
    "properties": {
      "name": "Dinagat Islands"
    }
  };
  var geojson4 = 
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [-5.511, 51.058]
    },
    "properties": {
      "name": "Dinagat Islands"
    }
  };

  var geojsons = [geojson1, geojson2, geojson3, geojson4];
 return geojsons;
}