
  var getCityEl = document.querySelector('#city-name');
  var modalButton = document.querySelector('.modal');

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'community-citybikes.p.rapidapi.com',
      'X-RapidAPI-Key': 'f17db1dcddmsh3dce12092ca5ebep17ef72jsn4fcd0fdb0eeb'
    }
  };
  
  fetch('https://community-citybikes.p.rapidapi.com/valenbisi.json', 
  city +
    "name" +
    "idx" +
    "number" +
    "free" +
    "bikes" +
    "coordinates" +
    "&lat=&lng" +
    "station_url")
    
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err)); { 
      if (response.ok) {
        // log response
        console.log(response);
        response.json().then(function (data) {
            // long data returned from server
            console.log(data);
        var factEl = document.getElementById("fact");
        factEl.textContent = data.fact;
        factEl.innerText = data.fact
        })
      } 
    };
    
  
    

  