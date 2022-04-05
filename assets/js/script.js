// form element
var userFormEl = document.querySelector('#user-form');
// the city provided from the user input
var getCityEl = document.querySelector('#city-name');
// submit button
var button = document.querySelector('.Btn');
// city image element
var img = document.querySelector('#image');
// see more facts button
var moreFacts = document.querySelector('#more-facts');
//modal options
var options = document.querySelector('option');
//cost of living option
var livingCost = document.querySelector('#cost');
//Job Salary Calculator option
var salary = document.querySelector('#salary');
//climate option
var climate = document.querySelector('#climate');
//modal Content
var modalContent = document.querySelector('#modal-content');
// cost script 
var costScript = document.querySelector('#cost-script');
// fact script
var factsScript = document.querySelector('#fact-script');
// crime rates button
var safety = document.querySelector('#safety');


userFormEl.addEventListener("submit", function(event) {
    event.preventDefault();
    // user input
    getCoordinates(getCityEl.value);

    // api url. remove spaces from input and replace spaces with dashes, and make all letters lowercase
    var url = "https://api.teleport.org/api/urban_areas/slug:" + getCityEl.value.replace(/\s+/g, '-').toLowerCase() + "/images/";

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
            })
        }
    });
});

climate.addEventListener("click", function() {
    window.open("https://teleport.org/cities/denver/widget/weather/?currency=USD");
});

livingCost.addEventListener("click", function() {
    window.open("https://teleport.org/cities/denver/widget/costs/?currency=USD");
});

salary.addEventListener("click", function() {
    window.open("https://teleport.org/cities/denver/widget/salaries/?currency=USD");
});

safety.addEventListener("click", function() {
    window.open("https://teleport.org/cities/denver/widget/crime/?currency=USD");
});


// enlarge the image when the user clicks on it. function gotten from Materialize
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(elems);
});