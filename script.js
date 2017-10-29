$(document).ready(function() {
  getGeoLocation();

  function getGeoLocation() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getWeather);
    } else {
      console.log("Geolocation is not being supported on this browser");
    }
  }

  function getWeather(location){
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
      let weatherPic = JSON.weather[0].icon;
      let locationName = JSON.name;
      let weather = JSON.weather[0].main
      displayWeather(weatherPic, locationName, weather);
    }

    function handleError(jqxhr, textStatus, err) {
      console.log("Request Failed: " + textStatus + ", " + err);
    }//handleError
  }//get Weather

  function displayWeather(weatherPic,locationName,weather){
    $("#intro-header").text(locationName);
    $("#current-weather").text(weather);
    $("#weather-picture").attr('src', weatherPic);
    console.log(weatherPic,locationName,weather)
  }//displayWeather

})








 // let getQuote = function(){
 //    $.ajax({
 //        url: "https://api.forismatic.com/api/1.0/",
 //        jsonp: "jsonp",
 //        dataType: "jsonp",
 //        data: {
 //          method: "getQuote",
 //          lang: "en",
 //          format: "jsonp"
 //        }
 //      })
 //      .done(parseJSON)
 //      .fail(handleError);

 //    function parseJSON(JSON) {
 //      let quoteText = JSON.quoteText;
 //      let author = "- "
 //      author += JSON.quoteAuthor;
 //      displayQuote(quoteText, author);
 //    }

 //    function handleError(jqxhr, textStatus, err) {
 //      console.log("Request Failed: " + textStatus + ", " + err);
 //    }
 //  }// getQuote




// <script>
// var x = document.getElementById("demo");
// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition);
//     } else {
//         x.innerHTML = "Geolocation is not supported by this browser.";
//     }
// }
// function showPosition(position) {
//     x.innerHTML = "Latitude: " + position.coords.latitude +
//     "<br>Longitude: " + position.coords.longitude;
// }
// </script>