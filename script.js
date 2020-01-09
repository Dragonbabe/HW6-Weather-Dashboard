$(document).ready(function () {
    var userInput = document.querySelector('#userinput');
    var searchButton = document.querySelector('#searchbutton');



    searchButton.addEventListener('click', function () {
        var city = userInput.value;
        populateWeatherdata(city);


    })





    function populateWeatherdata(city) {


        //var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=9539fd31c5b05c00c30c1fd1ee767fdc";
        var queryUrl = "https://api.openweathermap.org/data/2.5/weather";
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
            console.log(result);




            //document.querySelector('#displaytemp').value = result.main.temp;
            $("#displaytemp").text(result.main.temp);
            $("#displayhumidity").text(result.main.humidity);
            $("#displaywindspeed").text(result.wind.speed);
            getUVIndex(result.coord.lat, result.coord.lon);


        });


    }
    function getUVIndex(lat, lon) {

        console.log(lat, lon);

        // var alt = $('#alt').val();
        // var ozone = $('#ozone').val();
        // var dt = $('#dt').val();

        $.ajax({
            type: 'GET',
            dataType: 'json',
            beforeSend: function (request) {
                request.setRequestHeader('x-access-token', 'e16c9cd4119ab50e76243248b4e52d67');
            },
            url: 'https://api.openuv.io/api/v1/uv?lat=' + lat + '&lng=' + lon
        }).then(function (response) {
            $("#displayuvindex").text(response.result.uv);
            console.log(response.result.uv)
        });
    }

});
