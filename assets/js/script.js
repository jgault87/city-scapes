// form element
var userFormEl = document.querySelector('#user-form');
// the city provided from the user input
var getCityEl = document.querySelector('#city-name');
// submit button
var button = document.querySelector('.Btn');
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


userFormEl.addEventListener("submit", function(event) {
    event.preventDefault();
    // user input
    getCoordinates(getCityEl.value); /*<== pushes search to call api */
    previousSearches.push(getCityEl.value); /*<== pushes search to history/storage function */
    renderHistory();
    storeHistory();

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

// open new window to show climate stats
climate.addEventListener("click", function() {
    window.open("https://teleport.org/cities/" + getCityEl.value.replace(/\s+/g, '-').toLowerCase() + "/widget/weather/?currency=USD");
});

// open new window to show living cost stats
livingCost.addEventListener("click", function() {
    window.open("https://teleport.org/cities/" + getCityEl.value.replace(/\s+/g, '-').toLowerCase() + "/widget/costs/?currency=USD");
});

// open new window to show the salary calculator
salary.addEventListener("click", function() {
    window.open("https://teleport.org/cities/" + getCityEl.value.replace(/\s+/g, '-').toLowerCase() + "/widget/salaries/?currency=USD");
});

// open new window to show crime rates
safety.addEventListener("click", function() {
    window.open("https://teleport.org/cities/" + getCityEl.value.replace(/\s+/g, '-').toLowerCase() + "/widget/crime/?currency=USD");
});


// enlarge the image when the user clicks on it. function gotten from Materialize
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(elems);
});

// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.modal');
//     var dropdown = document.querySelectorAll('select');
//     var instances = M.Modal.init(elems,dropdown);
//     M.FormSelect.init(dropdown);
// });

//<div class="input-field col s12">
    //<select class="form-control">
        //<option value="" disabled selected>Choose your option</option>
        //<option value="1">Option 1</option>
        //<option value="2">Option 2</option>
        //<option value="3">Option 3</option>
    //</select>
    //<label>Materialize Select</label>
//</div>
