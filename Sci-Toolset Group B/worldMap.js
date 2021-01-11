function onLoad()
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
          const mymap = L.map('myMap').setView([lat, lon], 15);
          const attribution =
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
          const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
          const tiles = L.tileLayer(tileUrl, { attribution });
          tiles.addTo(mymap);
          const marker = L.marker([lat, lon]).addTo(mymap);
          console.log("I've reached this point but won't display the map!")
        });
      } 
      else 
      {
        console.log('Geolocation not available');
      }
}