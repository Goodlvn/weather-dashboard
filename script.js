
var apiKey = "66b8adbedf0a70ee9d83006586727a5c"

var long;

var lat;

function getCurrentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    return today;
}

function currenWeather(cityName) {

    var queryURl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey;

    $.ajax({
        url: queryURl,
        method: "GET"
    }).then(function (response) {

        $("#currentWeatherMain").empty();


        var cityCardTitle = $("#city-name");

        cityCardTitle.text(response.name + " (" + getCurrentDate() + ")");


        var weatherIcon = $("<img>");
        var iconcode = response.weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

        weatherIcon.attr("id", "wicon");
        weatherIcon.attr("src", iconurl);
        cityCardTitle.append(weatherIcon);



        var cardTemp = $("<p>");
        cardTemp.text("Temperature: " + response.main.temp + "°")
        $("#currentWeatherMain").append(cardTemp);

        var cardHumi = $("<p>");
        cardHumi.text("Humidity: " + response.main.humidity + "%")
        $("#currentWeatherMain").append(cardHumi);

        var cardWind = $("<p>");
        cardWind.text("Wind Speed: " + response.wind.speed + " MPH")
        $("#currentWeatherMain").append(cardWind);







        

        

        // console.log(response.main.temp);

        // console.log(response.main.humidity);

        // console.log(response.wind.speed);

        long = response.coord.lon;

        lat = response.coord.lat;

        // console.log(long, lat);

        getUV(long, lat);

        fiveDayCast(cityName);
    });
};


function fiveDayCast(cityName) {

    var addDay = 0;

    var queryURl = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + apiKey;

    $.ajax({
        url: queryURl,
        method: "GET"
    }).then(function (fiveDayResponse) {

        for (i = 0; i < fiveDayResponse.list.length; i++) {

            if (fiveDayResponse.list[i].dt_txt.indexOf("12:00:00") !== -1) {

                addDay++;

                var today = new Date();
                today.setDate(today.getDate() + addDay)

                var dd = String(today.getDate()).padStart(2, "0");
                var mm = String(today.getMonth() + 1).padStart(2, "0");
                var yyyy = today.getFullYear();

                var todayString = mm + '/' + dd + '/' + yyyy;

                // console.log(todayString);
                // console.log(fiveDayResponse.list[i].weather[0].icon);
                // console.log(fiveDayResponse.list[i].main.temp);
                // console.log(fiveDayResponse.list[i].main.humidity);

                // card creation starts here 
            }
        };

    });
};

function getUV(long, lat) {

    var queryURl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long + "&appid=" + apiKey;

    $.ajax({
        url: queryURl,
        method: "GET"
    }).then(function (uvResponse) {

    });

};



$("#search-button").on("click", function () {

    var citySearch = $("#city-input").val().trim();

    currenWeather(citySearch);

    $("#city-input").val("");


});



// How to get current date
// https://www.w3schools.com/js/js_dates.asp
// https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart

// how to set icons to weather
// https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon



