
function OnLoad()
{
    console.log("I have loaded!");

        mapPolygons = []


        //add event listeners to buttons etc.
        document.getElementById("refreshMapBtn").addEventListener("click", function() {
          ResetMap(mymap, mapPolygons);
        })

        
        document.getElementById("submitDateTimeBtn").addEventListener("click", function() {
          SetDateTime(mymap, mapPolygons);
        })

        //end of event listeners


          mymap = L.map('mymap').setView([55.65, -6.145], 15);    
          const maxZoom = 10;
         

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
            for(i = 0; i < numberofIDs; i++)
            {
              CurrentID = response.missions[i].id;
              currentName = response.missions[i].name;
              currentTakeoff = response.missions[i].aircraftTakeOffTime;
              callDataInOrder(CurrentID).then(res => 
              {
                if(res.type === "Polygon")
                {
                  plotPolygons(mymap, res.coordinates, currentName, currentTakeoff);
                } 
                else if (res.type === "MultiPolygon")
                {
                    plotMultiPolygon(mymap, res.coordinates, currentName, currentTakeoff);
                }
              })
            }
          })
};

function SetDateTime(mymap, mapPolygons)
{
    var elem = document.getElementById("meeting-time").value;     
    
    var elemdate = new Date(elem);

    var dateChecker = new Date(1970, 0, 1, 1);

    var Miliseconds = elemdate.getTime()-dateChecker.getTime();

    var endMiliseconds = Miliseconds+86400000;

    var IDlist = [];

    ClearMap(mymap, mapPolygons);

    getIDs().then(response =>
      {
      for (i = 0; i < response.missions.length; i++) 
      {   
        var takeoffpull = parseInt(response.missions[i].aircraftTakeOffTime)

        var takeoff = takeoffpull;
        var difference = takeoff-Miliseconds;

        if (takeoffpull >= Miliseconds && takeoffpull <= endMiliseconds)
        {
           IDlist.push(response.missions[i].id)
        }
      }
      
      for(i = 0; i < IDlist.length; i++)
       {
         currentName = response.missions[i].name;
        currentTakeoff = response.missions[i].aircraftTakeOffTime;
         CurrentID = IDlist[i];
         callDataInOrder(CurrentID).then(res=> 
         {
           if(res.type === "Polygon")
           {
              plotPolygons(mymap, res.coordinates, currentName, currentTakeoff);
           }
           else if (res.type === "MultiPolygon")
           {
              plotMultiPolygon(mymap, res.coordinates, currentName, currentTakeoff);
           }

         })
       }
     }) 
    
   }

function ClearMap(mymap, mapPolygons)
{
  for (i = 0 ;i < mapPolygons.length; i++) 
  { 
    mymap.removeLayer(mapPolygons[i]);                  
  }
}

function ResetMap(mymap, mapPolygons)
{
  ClearMap(mymap, mapPolygons);
  
  getIDs().then(response=> 
    {
      var numberofIDs = response.missions.length;
      for(i = 0; i < numberofIDs; i++)
      {
        CurrentID = response.missions[i].id;
        currentName = response.missions[i].name;
        currentTakeoff = response.missions[i].aircraftTakeOffTime;
        callDataInOrder(CurrentID).then(res => 
        {
          if(res.type === "Polygon")
          {
            plotPolygons(mymap, res.coordinates, currentName, currentTakeoff);
          } 
          else if (res.type === "MultiPolygon")
          {
              plotMultiPolygon(mymap, res.coordinates, currentName, currentTakeoff);
          }
        })
      }
    })
  
}

function plotMultiPolygon(mymap, response, name, takeoff)
{
  var allCoords = response;
  for(let i = 0; i < allCoords.length; i++)
  {
    plotPolygons(mymap, allCoords[i], name, takeoff);
  }
}

// Pass in the map, and an array of polygons
function plotPolygons(mymap, response, name, takeoff)
{
  console.log("Plotting Polygon");
  console.log("Name: " + name);
  console.log("TakeOff: " + takeoff);
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
    var nameText = `${name}`;
    var takeoffText = `${takeoff}`;
    var flightPolygon = L.polygon(swappedPolygons[i], {color: 'red'}).addTo(mymap);
    flightPolygon.bindPopup(`<h1><b>Name: </b></h1> <p>${nameText}</p><h1> Takeoff time: </h1><p>${takeoffText}</p>`);
    mapPolygons.push(flightPolygon);
    }
}    

function SwapLatLng(latlng)
{
  return [latlng[1], latlng[0]]
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
