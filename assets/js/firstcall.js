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
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          "X-RapidAPI-Key":
            "e5e2b6f887msh0ddb6a2c600bdc3p1762f9jsn6415dabc6973",
        },
      };

      fetch(
        "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?location=" +
          CoordLat +
          CoordLon +
          "&minPopulation=2500&distanceUnit=MI",
        options
      )
        // .then(response => response.json())
        // .then(response => console.log(response.data[0].wikiDataId));
        // .catch(err => console.error(err));

        .then(function (response) {
          if (!response.ok) {
            throw response.json();
          }

          return response.json();
        })
        .then(function (response) {
          console.log(response);
          
          let city = response.data[0].city;
          let state = response.data[0].region;
          let country = response.data[0].country;
          let population = response.data[0].population;
          let wikiData = response.data[0].wikiDataId;

          let factsURL = "https://www.wikidata.org/wiki/" + wikiData;

          var place = city + ', ' + state + ' ' + '(' + country + ')';
          console.log(place);
          cardHeadEl.innerHTML = place;
          popEl.innerHTML = 'Population:' + ' ' + population;


          dataPageEl.innerHTML = '<a href=\"' + factsURL +'\">' + 'WIKIDATA PAGE' + '</a>';
          // dataPageEl.classList.add("btn");

          //unhide previously explored text
          // unhideEl.classList.remove('hide');
          
          console.log(factsURL);

        });
    });
}
var cardHeadEl = document.getElementById('nametitle');
var popEl = document.getElementById('population');
var dataPageEl = document.getElementById('wikidata-page');
var previousSearches = [];
var unhideEl = document.getElementById('unhide');


var historyEl = document.getElementById("search-list");

function renderHistory() {
  historyEl.innerHTML = "";
  for (var i = 0; i < previousSearches.length; i++) {
    var previousSearch = previousSearches[i];

    var li = document.createElement("li");
    li.textContent = previousSearch;
    li.setAttribute("data-index", i);
    li.addEventListener("click", function () {
     
      searchReturn = this.textContent.split("clear");
      console.log(searchReturn[0]);
      // getCoordinates(searchReturn);

      //  pass to function for search
      renderteleportAPI(searchReturn[0]);
    });

    var button = document.createElement("button");
    button.textContent = "clear";

    li.classList.add('card');
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
  resetInput();
}

historyEl.addEventListener("click", function (event) {
  var element = event.target;
  // Checks if element is a button
  if (element.matches("button") === true) {
    var index = element.parentElement.getAttribute("data-index");
    previousSearches.splice(index, 1);

    //storeHistory();
    renderHistory();
  }
});

init();



function resetInput() {
  getCityEl.value = "";

  
}
