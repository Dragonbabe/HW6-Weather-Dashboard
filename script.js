var userInput = document.querySelector('#userinput');
var searchButton = document.querySelector('#searchbutton');


searchButton.addEventListener('click', function () {
    var city = userInput.value;
    populateWeatherdata(city);
    console.log(userInput);


})





function populateWeatherdata(city) {


    //var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=9539fd31c5b05c00c30c1fd1ee767fdc";
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather";

    $.ajax({
        url: queryUrl,
        data: {
            q: city,
            units: "imperial",
            APPID: "9539fd31c5b05c00c30c1fd1ee767fdc"

        },
        method: 'GET'
    }).done(function (result) {
        console.log(result);
        console.log(result.main.temp);
        //document.querySelector('#displaytemp').value = result.main.temp;
        $("#displaytemp").html(result.main.temp);
        $("#displayhumidity").html(result.main.humidity);
        $("#displaywindspeed").html(result.wind.speed);


    })

}


