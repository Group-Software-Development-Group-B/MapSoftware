function OnLoad()
{
    console.log("I have loaded!");

          const mymap = L.map('mymap').setView([55.65, -6.145], 15);    
          const maxZoom = 10;
          mapPolygons = [];

          mymap.on('click', function(e) {        
              ClearMap(mymap);
          });

           const defaultMap = L.tileLayer (
              'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom 
              });
          
          
           const secondaryMap = L.tileLayer (
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
            maxZoom 
          });
          
          const openstreetmapHot = L.tileLayer(
            'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
            maxZoom 
          })
          
          // Tile type: openstreetmap Osm
          const openstreetmapOsm = L.tileLayer(
            'http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
            maxZoom 
          })
          

          var allOptions = {
              "Default Map": defaultMap,
              "Alternative Map": openstreetmapHot,
              "Geographic Map": secondaryMap,
              "Map With Towns & Cities": openstreetmapOsm
          };

          openstreetmapHot.addTo(mymap);
          L.control.layers(allOptions).addTo(mymap);
        

          getIDs().then(response=> 
          {
            var numberofIDs = response.missions.length;
            console.log(numberofIDs)
            for(i = 0; i < numberofIDs; i++)
            {
              CurrentID = response.missions[i].id;
              callDataInOrder(CurrentID).then(response => 
              {
                if(response.type === "Polygon")
                {
                  plotPolygons(mymap, response.coordinates);
                } 
                else if (response.type === "MultiPolygon")
                {
                    plotMultiPolygon(mymap, response.coordinates);
                }

              })
            }
          }) //.then ends here
};

function plotMultiPolygon(mymap, response)
{
  console.log("Plotting MultiPolygon")
  var allCoords = response;
  for(let i = 0; i < allCoords.length; i++)
  {
    plotPolygons(mymap, allCoords[i]);
  }
}

// Pass in the map, and an array of polygons
function plotPolygons(mymap, response)
{
  console.log("Plotting Polygon")
  var allCoords = response;

    var originalPolygons = [];
    var swappedPolygons = []; 

    // make an array of polygons
    for (let i = 0; i < allCoords.length; i++)
    {
      originalPolygons.push(allCoords[i]);    
      console.log(allCoords[i]);
    }
  
    for (let i = 0; i < originalPolygons.length; i++)
    {
      let convertedPoints = [];
      for (let j = 0; j < originalPolygons[i].length; j++)
      {
        convertedPoints.push(SwapLatLng(originalPolygons[i][j]));	
      }
    swappedPolygons.push(convertedPoints);
    var flightPolygon = L.polygon(swappedPolygons[i], {color: 'red'}).addTo(mymap);
    flightPolygon.bindPopup("Wagwan G, I'm a polywagwan");
    mapPolygons.push(flightPolygon);
    }
}

function SwapLatLng(latlng)
{
  return [latlng[1], latlng[0]]
}

function ClearMap(mymap)
{
  mapPolygons.forEach(element =>  mymap.removeLayer(element));
}

    console.log("index.html 7 | Get Flight Data");
    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "password");
    urlencoded.append("username", "hallam-b");
    urlencoded.append("password", "GtA>9Ec?");

    const getAccess = async () => {
      console.log("index.html 10 | Processing...");
      const request = await fetch('https://hallam.sci-toolset.com/api/v1/token',{  method: 'post', 
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded', 
        'Accept': '*/*', 
        'Host': 'hallam.sci-toolset.com', 
        'Authorization': 'Basic YjIxNjZlODAtYjczMi00NDA4LTkyZjEtYzUzYTUyM2YyMTIzOjc5YzAwNjMwNDY1Mzk3MTNlMWFkOTljM2EyYWIyNGUyZmQ3ODdiZDM3YWRjYTU4MWUxMWNiYzk1MWZkYWM1ODM='
  },
  body: urlencoded
  },);
      const data = await request.json();
      return data;
    };

      const getMissions = async token => {
        console.log("index.html 10 | Processing...");
        const request = await fetch('https://hallam.sci-toolset.com/discover/api/v1/missionfeed/missions',{  method: 'get', 
        headers: { 
          'Content-Type': 'application/json',
          'Accept': '*/*',
         'Host': 'hallam.sci-toolset.com',
          'Authorization': 'Bearer ' + token.access_token},
    },);
        const missions = await request.json();
        return missions;
     }

    const getCoordinates = async (token, IDs) => {
      console.log("index.html 10 | Processing...");
        const request = await fetch('https://hallam.sci-toolset.com/discover/api/v1/missionfeed/missions/'+IDs+'/footprint',{  method: 'get', 
        headers: { 
          'Content-Type': 'application/json',
          'Accept': '*/*',
         'Host': 'hallam.sci-toolset.com',
          'Authorization': 'Bearer ' + token.access_token},
    },);
        const missionCoordinate = await request.json();
        return missionCoordinate;
     }
     
    const callDataInOrder = async CurrentID => {
      
      const data = await getAccess();
      const IDs = await getMissions(data);
        

        const missionCoordinates = await getCoordinates(data, CurrentID);
        console.log('index.html 31 | detail Data', missionCoordinates);
        return missionCoordinates;
    }
    const getIDs = async() => {
      const data = await getAccess();
      const IDs = await getMissions(data);

      return IDs;

     }
