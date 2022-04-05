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


var previousSearches = [];

var historyEl = document.getElementById("search-list");

function renderHistory() {
  historyEl.innerHTML = "";
  for (var i = 0; i < previousSearches.length; i++) {
    var previousSearch = previousSearches[i];

    var li = document.createElement("li");
    li.textContent = previousSearch;
    li.setAttribute("data-index", i);
    li.addEventListener("click", function () {
      //  searchReturn = li.textContent.split('clear');
      searchReturn = this.textContent.split("clear");
      console.log(searchReturn);
      getCoordinates(searchReturn);
      

    

      //  pass to function for search
    });

    var button = document.createElement("button");
    button.textContent = "clear";

    historyEl.appendChild(li);
    li.appendChild(button);
  }
}

function init() {
  var storedPreviousSearches = JSON.parse(
    localStorage.getItem("previousSearches")
  );

  if (storedPreviousSearches !== null) {
    previousSearches = storedPreviousSearches;
  }

  renderHistory();
}

function storeHistory() {
  // Stringify and set key in localStorage array
  localStorage.setItem("previousSearches", JSON.stringify(previousSearches));
}


historyEl.addEventListener("click", function (event) {
  var element = event.target;
  // Checks if element is a button
  if (element.matches("button") === true) {
    var index = element.parentElement.getAttribute("data-index");
    previousSearches.splice(index, 1);

    storeHistory();
    renderHistory();
  }
});


init();