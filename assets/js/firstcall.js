var APIKey = "f3ffd1bebd9a1cb69ed3311049f6cdca";



function getCoordinates(city) {
    
  callURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey;

  

  fetch(callURL)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })

    
    .then(function (response) {
      let CoordLat = response.coord.lat;
      let CoordLon = response.coord.lon;
      console.log(response);


      const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
            'X-RapidAPI-Key': 'e5e2b6f887msh0ddb6a2c600bdc3p1762f9jsn6415dabc6973'
            
        }

    };

    
    fetch('https://wft-geo-db.p.rapidapi.com/v1/geo/cities?location='+ CoordLat + CoordLon + '&minPopulation=25000&distanceUnit=MI', options)
    
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
    });
}


