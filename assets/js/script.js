// form element
var userFormEl = document.querySelector('#user-form');
// the city provided from the user input
var getCityEl = document.querySelector('#city-name');
// submit button
var button = document.querySelector('.btn');
// city image element
var img = document.querySelector('#image');
//cost of living option
var livingCost = document.querySelector('#cost');
//Job Salary Calculator option
var salary = document.querySelector('#salary');
//climate option
var climate = document.querySelector('#climate');
// crime rates button
var safety = document.querySelector('#safety');
// default the city search to Denver
var defaultCity = "denver";
// variable to check if city is already stored
var cityExists = false;
// city variable
var city;

//when the page is loaded content call the renderteleportAPI function and pass the defaultCity variable as the argument
window.onload = function() {
    renderteleportAPI(defaultCity);
};

// submit handler to pass the user's city to the renderteleportAPI function and clear the input value
var submitHandler = function(event) {
    event.preventDefault();
    
    // update city variable to equal user input
    city = getCityEl.value;

    // check to see if the city the user inputed already exists
    for (i = 0; i < previousSearches.length; i++) {
        if (previousSearches[i] === city) {
            cityExists = true;
        }
    }

    // if the city doesn't exist call content functions
    if (cityExists === false) {
        renderteleportAPI(city);
        previousSearches.push(city); /*<== pushes search to history/storage function */
        renderHistory();
        storeHistory();
    }

}

// function to get the teleportAPI data and display on the page
function renderteleportAPI(location) {
    // user input
    getCoordinates(location); /*<== pushes search to call api */

    var url;

    // api url. remove spaces from input and replace spaces with dashes, and make all letters lowercase
    var url = "https://api.teleport.org/api/urban_areas/slug:" + location.replace(/\s+/g, '-').toLowerCase() + "/images/";

    // fetch api
    fetch(url).then(function(response) {
        // if serer response is ok
        if (response.ok) {
            // log response
            console.log(response);
            response.json().then(function (data) {
                // long data returned from server
                console.log(data);
                // update the image src with the photo link of the city
                img.src = data.photos[0].image.web;
                //clear search field after submission
            })
        }
    });

    // update city value
    city = location;
};

// when the form is submitted call the submitHandler function
userFormEl.addEventListener("submit", submitHandler);

// open new window to show climate stats
climate.addEventListener("click", function() {
    window.open("https://teleport.org/cities/" + city.replace(/\s+/g, '-').toLowerCase() + "/widget/weather/?currency=USD");
});

// open new window to show living cost stats
livingCost.addEventListener("click", function() {
    window.open("https://teleport.org/cities/" + city.replace(/\s+/g, '-').toLowerCase() + "/widget/costs/?currency=USD");
});

// open new window to show the salary calculator
salary.addEventListener("click", function() {
    window.open("https://teleport.org/cities/" + city.replace(/\s+/g, '-').toLowerCase() + "/widget/salaries/?currency=USD");
});

// open new window to show crime rates
safety.addEventListener("click", function() {
    window.open("https://teleport.org/cities/" + city.replace(/\s+/g, '-').toLowerCase() + "/widget/crime/?currency=USD");
});


// enlarge the image when the user clicks on it. function gotten from Materialize
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(elems);
});


