var userInput = document.querySelector('#userinput');
var searchButton = document.querySelector('#searchbutton');


searchButton.addEventListener('click', function () {
    var city = userInput.value;
    populateWeatherdata(city);
})












function populateWeatherdata(city) {


    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=9539fd31c5b05c00c30c1fd1ee767fdc";

    $.ajax({
        url: queryUrl,
        method: 'GET'
    })
        .done(function (result) {
            console.log(result);
        })
}



