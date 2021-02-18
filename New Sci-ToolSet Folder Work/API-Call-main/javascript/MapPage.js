function OnLoad()
{
    console.log("I have loaded!");

          const mymap = L.map('mymap').setView([55.65, -6.145], 15);        

           const defaultMap = L.tileLayer (
              'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 7
              });
          
          
           const secondaryMap = L.tileLayer (
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
            maxZoom: 7
          });
          
          const openstreetmapHot = L.tileLayer(
            'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
            maxZoom: 7
          })
          
          // Tile type: openstreetmap Osm
          const openstreetmapOsm = L.tileLayer(
            'http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
            maxZoom: 7
          })
          

          var allOptions = {
              "Default Map": defaultMap,
              "Alternative Map": openstreetmapHot,
              "Geographic Map": secondaryMap,
              "Map With Towns & Cities": openstreetmapOsm
          };

          openstreetmapHot.addTo(mymap);
          L.control.layers(allOptions).addTo(mymap);
          
          var array= [];

          getIDs().then(response=> {
            
          })

          callDataInOrder().then(response => {
            plotPolygons(mymap, response.coordinates);
            
            // further stuff here


        }) //.then ends here
};

// Pass in the map, and an array of polygons
function plotPolygons(mymap, allCoords)
{
  console.log("number of polygons:" + allCoords.length);
  var originalPolygons = [];
  var swappedPolygons = []; 
  // make an array of polygons
  for (let i = 0; i < allCoords.length; i++)
  {
    originalPolygons.push(allCoords[i]);    
  }
  console.log(originalPolygons[0])
  //loop through all polygons, convert each point and push them to a new array
  for (let i = 0; i < originalPolygons.length; i++)
  {
    let convertedPoints = [];
    for (let j = 0; j < originalPolygons[i].length; j++)
    {
      convertedPoints.push(SwapLatLng(originalPolygons[i][j]));	
    }

  swappedPolygons.push(convertedPoints);
  var flightPolygon = L.polygon(swappedPolygons[i], {color: 'red'}).addTo(mymap);
  flightPolygon.bindPopup("<h1>Hello!</h1><p>" + "<h2>The first points in this Polygon are: </h2><b>" + swappedPolygons[0][0][0] + "<br>" + swappedPolygons[0][0][1] + "</b></br>" +
  "<br><b> The second points are: <br>" + swappedPolygons[0][1][0] + "<br>" + swappedPolygons[0][1][1] + "</br></b>"
    );
  }
  // console.log(originalPolygons[0]);
  // console.log(swappedPolygons[0]);
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
        const request = await fetch('https://hallam.sci-toolset.com/discover/api/v1/missionfeed/missions/'+IDs.missions[0].id+'/footprint',{  method: 'get', 
        headers: { 
          'Content-Type': 'application/json',
          'Accept': '*/*',
         'Host': 'hallam.sci-toolset.com',
          'Authorization': 'Bearer ' + token.access_token},
    },);
        const missionCoordinate = await request.json();
        return missionCoordinate;
     }
     
    const callDataInOrder = async () => {
      const data = await getAccess();
      const IDs = await getMissions(data);
        

        const missionCoordinates = await getCoordinates(data, IDs);
        console.log('index.html 31 | detail Data', missionCoordinates);
        return missionCoordinates;

    const getIDs = async() => {
      const data = await getAccess();
      const IDs = await getMissions(data);

      return IDs;

     }
             
}



/* var geojsonFeature = {
            "type": "Feature",
            "properties": {
                "name": {ID},
                "amenity": "Baseball Stadium",
                "popupContent": "This is where the Rockies play!"
            },
            "geometry": {
                "type": "Point",
                "coordinates": {data}
            }
        }; */
      



      // Stuff i found that might be useful
      //
      //
      //    async getAccessToken() {
      //    let d = await fetch('https://hallam.sci-toolset.com/api/v1/token/', {
      //      method: 'POST',
      //     body: 'grant_type=password&username=hallam-a&password=z[97V<WM',
      //      headers: {
      //          'Accept': '*/*',
      //          'Authorization': 'Basic ' + btoa(this.id + ":" + this.secret),
      //          'Content-Type': 'application/x-www-form-urlencoded'
      //      },
      //  })
      //
      //  if (d.ok) {
      //      return await d.json();
      //  }
      //
      //
      // ------------------------------------------------------
      //                  getting specific products from api
      //
      //
      //      let products = [];
      //      Get the list of product IDs.
      //      let productIDs = await fetch('https://hallam.sci-toolset.com/discover/api/v1/products/search', {
      //          method: 'POST',
      //          body: `{ "size":${amt}, "keywords":"" }`,
      //          headers: {
      //              'Accept': '*/*',
      //               'Authorization': 'Bearer ' + this.accessToken,
      //               'Content-Type': 'application/json'
      //          }
      //      })  
      //      let productIDs = await fetch('https://hallam.sci-toolset.com/discover/api/v1/products/search', {
      //          method: 'POST',
      //          body: `{"size":${amt}, "keywords":""}`,
      //          headers: {
      //              'Accept': '*/*',
      //              'Authorization': 'Bearer ' + this.accessToken,
      //              'Content-Type': 'application/json'
      //          }
      //       })
      //
      //       if (productIDs.ok) {
      //           productIDs = await productIDs.json();
      //           for (let p of productIDs.results.searchresults) 
      //           {
      //               let productData = await fetch("https://hallam.sci-toolset.com/discover/api/v1/products/" + p.id, {
      //               headers: {
      //                   Authorization: 'Bearer ' + this.accessToken,
      //               },
      //           })
      //           products.push(await productData.json());
      //         }
      //     }
      //     return products;
      // }
      //
      // ---------------------------------------------------------------------------
      //                  on mouse click example
      //
      //    newMarker.on("click", (e) => {
      //        const id = e.target._leaflet_id;
      //        for (let h = 0; h < iconsLayer.length; h++) {
      //            if (id == iconsLayer[h]._leaflet_id) {
      //                var y = iconsLayer[h]._latlng.lat;
      //                var x = iconsLayer[h]._latlng.lng;
      //                mymap.flyTo([y, x], 10.3, { duration: 4 });
      //            }
      //        }
      //    })
      //
      // -----------------------------------------------------------------------------
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //       
      // 
      //                         
      // 
      //     
      // 
      //     
      // 
