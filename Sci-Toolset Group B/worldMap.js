function main() 
{
  if ('geolocation' in navigator) 
  {
    console.log('Geolocation available');
    navigator.geolocation.getCurrentPosition(position => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log(lat, lon);
    document.getElementById('latitude').textContent = lat;
    document.getElementById('longitude').textContent = lon;

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
        var coords = e.latlng;
      
        // Drops a pin at the clicked location
        marker = L.marker([coords.lat, coords.lng]).addTo(mymap);
      
        // Lets the user draw a polygon using mouse clicks
        polyLatLngs.push(e.latlng);
        var polygon = L.polygon(polyLatLngs, {color: 'red'}).addTo(this);

          //Draws an image at the clicks location
          var imageUrl = 'https://placekitten.com/g/200/300',
          imageBounds = [e.latlng, [e.latlng.lat+0.005, e.latlng.lng+0.005]];
          L.imageOverlay(imageUrl, imageBounds).addTo(this);
    })

});
} 
else 
{
  console.log('Geolocation not available');
} }

 