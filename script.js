//create status / error
$(document).ready(function() {
  let weather = {};
  let measure = 'celsius';

  if(navigator.geolocation) {
      dispalyStatus("Gathering Weather Data")
      navigator.geolocation.getCurrentPosition(getWeather)
  } else {
    dispalyStatus("Geolocation is not being supported on this browser");
  }


  $('#celsius').on('click',function(){
    measure = 'celsius';
    $('#fahrenheit').attr('class', 'btn')
    $('#celsius').attr('class', 'btn btn-selected');
    displayWeather()
  })

    $('#fahrenheit').on('click',function(){
    measure = 'fahrenheit';
    $('#celsius').attr('class', 'btn');
    $('#fahrenheit').attr('class', 'btn btn-selected');
    displayWeather()
  })


  function getWeather(location){
    console.log('getting weather')
    let url = "https://fcc-weather-api.glitch.me/api/current?lon=" +
          location.coords.longitude + "&lat=" +
          location.coords.latitude;
    $.ajax({
      url: url,
      jsonp: "json",
      dataType: "json"
    })
    .done(parseJSON)
    .fail(handleError)

    function parseJSON(JSON) {
      weather.location = JSON.name;
      weather.icon = JSON.weather[0].icon;
      weather.condition = JSON.weather[0].main;
      weather.celsius = Math.round(JSON.main.temp).toString() + " °C";
      weather.fahrenheit = Math.round((JSON.main.temp * 1.8) + 32)
                            .toString() + " °F";
      displayWeather();
    }

    function handleError(jqxhr, textStatus, err) {
      console.log("Request Failed: " + textStatus + ", " + err);
    }//handleError
  }//get Weather

  function displayWeather(){
    console.log(weather)
    console.log(measure, weather.celsius, weather.fahrenheit )
    $("#intro-header").text(weather.location);
    $("#current-condition").text(weather.condition);
    $("#weather-picture").attr('src', weather.icon);
    if (measure == "celsius") {
      $("#current-temp").text(weather.celsius)
    } else {
      $("#current-temp").text(weather.fahrenheit)
    }
    $(".weather-display").show();
  }//displayWeather

  function displayStatus(message){

  }//displayStatus

})//doc ready