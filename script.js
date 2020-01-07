var userInput = document.querySelector('#userinput');
var searchButton = document.querySelector('#searchbutton');

searchButton.addEventListener('click', function () {

    console.log(userinput.value);
})






var queryUrl;
queryUrl = "https//api.openweathermap.org/data/2.5/weather?q=Seattle,us&APPID=9539fd31c5b05c00c30c1fd1ee767fdc";