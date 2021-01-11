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

  // L. from Leaflet                
  const mymap = L.map('mymap').setView([lat, lon], 15);
  const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const tiles = L.tileLayer(tileUrl, { attribution });
  tiles.addTo(mymap);
  //plotPin(mymap, lat, lon);

  mymap.on('click', function(e)
  {
    console.log(e);
    let coords = e.latlng;
    console.log(coords);
    marker = L.marker([coords.lat, coords.lng]).addTo(mymap);
  })

  function plotPin(mymap, lat, lon)
  {
    marker = L.marker([lat, lon]).addTo(mymap);
  }  

});
} 
else 
{
  console.log('Geolocation not available');
} }