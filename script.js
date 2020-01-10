$(document).ready(function () {
    var userInput = document.querySelector('#userinput');
    var searchButton = document.querySelector('#searchbutton');

    searchButton.addEventListener('click', function () {
        var city = userInput.value;
        populateWeatherdata(city);

        var buttonElement = document.createElement('button');
        buttonElement.classList.add("btn", "btn-lg", "btn-outline-secondary");
        buttonElement.innerText = city;
        $("#displaycities").append(buttonElement);
    })

    function populateWeatherdata(city) {

        var queryUrl = "https://api.openweathermap.org/data/2.5/weather";
        var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast";
        var lat;
        var lon;

        $.ajax({
            url: queryUrl,
            data: {
                q: city,
                units: "imperial",
                APPID: "9539fd31c5b05c00c30c1fd1ee767fdc"

            },
            method: 'GET'
        }).then(function (result) {

            let imgURL = './assets/' + result.weather[0].icon + '@2x.png';


            $('#icons').attr("src", imgURL);
            $("#displaytemp").text(result.main.temp);
            $("#displayhumidity").text(result.main.humidity);
            $("#displaywindspeed").text(result.wind.speed);
            getUVIndex(result.coord.lat, result.coord.lon);
            $("#currentcity").text(result.name);
        });

        $.ajax({
            url: forecastUrl,
            data: {
                q: city,
                units: "imperial",
                APPID: "9539fd31c5b05c00c30c1fd1ee767fdc"

            },
            method: 'GET'
        }).then(function (result) {
            //create a new variable to store info for my day 5
            let imgURL = './assets/' + result.list[0].weather[0].icon + '@2x.png';

            $("#temperatureday5").text('hello');

            let html = '<p>' + 'temperature' + '</p>';

            $('body').append(html)

        });

    }
    function getUVIndex(lat, lon) {



        $.ajax({
            type: 'GET',
            dataType: 'json',
            beforeSend: function (request) {
                request.setRequestHeader('x-access-token', 'e16c9cd4119ab50e76243248b4e52d67');
            },
            url: 'https://api.openuv.io/api/v1/uv?lat=' + lat + '&lng=' + lon
        }).then(function (response) {
            $("#displayuvindex").text(response.result.uv);
        });



    }

});
