var userFormEl = document.querySelector('#user-form');
var getCityEl = document.querySelector('.form-input');
var button = document.querySelector('.btn');


function getLocation () {
    var apiKey = "hc5qtGlT9ypvJUQ5fubrbpEGCLgW632YW8fGtxbv";
    var lat = 39.742043;
    var lon = -104.991531;
    var newImg = document.createElement("img");
    newImg.setAttribute("id", "earth-image");
    

    var apiUrl = "https://api.nasa.gov/planetary/earth/imagery?lon=" + lon + "&lat=" + lat + "&api_key=" + apiKey;
  
    fetch(apiUrl)
        .then(res => res.json())
        .then(result => {
            console.log(result)
            newImg.src = result.message
        })
        .catch(err=>console.log(err))
        // .then(function (response) {
        //     if (response.ok) {
        //         console.log(response);
        //         response.json().then(function (data) {
        //             console.log(data);
        //     });
        //     } else {
        //         alert("Error: " + response.statusText);
        //     }
        // })
        // .catch(function (error) {
        //     alert("Unable to get location image");
        // });
};

userFormEl.addEventListener('submit', getLocation);