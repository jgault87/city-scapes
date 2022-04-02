var userFormEl = document.querySelector('#user-form');
var getCityEl = document.querySelector('#cityname');
var button = document.querySelector('.btn');
var img = document.querySelector('img');


userFormEl.addEventListener("submit", function(event) {
    event.preventDefault();
    var url = "https://api.teleport.org/api/urban_areas/slug:" + getCityEl.value + "/images/";

    fetch(url)
        .then(function(response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);

                    img.src = data.photos[0].image.web;
                })
            }
        })
})