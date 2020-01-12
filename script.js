$(document).ready(function () {

    var userInput = document.querySelector('#userinput');
    var searchButton = document.querySelector('#searchbutton');

    searchButton.addEventListener('click', function () {
        var city = userInput.value;
        window.localStorage.setItem(city, city);
        populateWeatherdata(city);

        var buttonElement = document.createElement('button');
        buttonElement.classList.add("btn", "btn-lg", "btn-outline-secondary");
        buttonElement.innerText = city;
        buttonElement.addEventListener('click', function () {


            populateWeatherdata(window.localStorage.getItem(this.innerHTML));
        })
        $("#displaycities").append(buttonElement);
    })

    function populateWeatherdata(city) {
        var queryUrl = "https://api.openweathermap.org/data/2.5/weather";
        var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast";

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
            $('#currentdate').text(moment.unix(result.dt).format('dddd MMM Do h:mm a'));

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
            $('#displayforecast').empty();
            for (var i = 0; i < result.list.length; i += 8) {
                let imgURL = './assets/' + result.list[i].weather[0].icon + '@2x.png';
                var cardEl = $("<div class='card'>");
                var containerEl = $("<div class='container'></div>");
                var dateEl = $('<h5>');
                dateEl.text(moment.unix(result.list[i].dt).format('dddd MMM Do'))
                var temperatureEl = $("<p>");
                var humidityEl = $("<p>");
                var imageEl = $("<img alt='weather icon'>").attr("src", imgURL)
                temperatureEl.text("Temperature " + result.list[i].main.temp);
                humidityEl.text("Humidity " + result.list[i].main.humidity);
                containerEl.append([dateEl, humidityEl, temperatureEl, imageEl]);
                cardEl.append(containerEl);
                $('#displayforecast').append(cardEl);
            }
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
