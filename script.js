var apiKey = "66b8adbedf0a70ee9d83006586727a5c"

var indexUV = 0;

var pasteSearch;

function getCurrentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    return today;
};

function currentWeather(cityName) {

    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        $("#currentWeatherMain").empty();


        var cityCardTitle = $("#city-name");

        cityCardTitle.text(response.name + " (" + getCurrentDate() + ")");


        var weatherIcon = $("<img>");
        var iconcode = response.weather[0].icon;
        var iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";

        weatherIcon.attr("id", "wicon");
        weatherIcon.attr("src", iconurl);
        cityCardTitle.append(weatherIcon);



        var cardTemp = $("<p>");
        cardTemp.text("Temperature: " + response.main.temp + "°");
        $("#currentWeatherMain").append(cardTemp);

        var cardHumi = $("<p>");
        cardHumi.text("Humidity: " + response.main.humidity + "%");
        $("#currentWeatherMain").append(cardHumi);

        var cardWind = $("<p>");
        cardWind.text("Wind Speed: " + response.wind.speed + " MPH");
        $("#currentWeatherMain").append(cardWind);

        long = response.coord.lon;
        lat = response.coord.lat;
        getUV(long, lat);

        fiveDayCast(cityName);
        saveSearches(response.name);
        displaySearches();
    });
};

function getUV(long, lat) {

    var queryURl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long + "&appid=" + apiKey;

    $.ajax({
        url: queryURl,
        method: "GET"
    }).then(function (uvResponse) {

        var indexUV = uvResponse.value;

        var cardUV = $("<span>");

        cardUV.text("UV Index: " + indexUV);

        if (indexUV <= 2) {
            cardUV.attr("class", "p-2 border border-success");
            cardUV.append(" (low)");
        } else if (indexUV <= 5) {
            cardUV.attr("class", "p-2 border border-warning");
            cardUV.append(" (moderate)");
        } else if (indexUV <= 7) {
            cardUV.attr("class", "p-2 border");
            cardUV.attr("style", "border-color:orange !important;");
            cardUV.append(" (high)");
        } else if (indexUV <= 10) {
            cardUV.attr("class", "p-2 border border-danger");
            cardUV.append(" (very high)");
        } else {
            cardUV.attr("class", "p-2 border");
            cardUV.attr("style", "border-color:purple !important;");
            cardUV.append(" (extreme)");
        }

        $("#currentWeatherMain").append(cardUV);
    });

};

function fiveDayCast(cityName) {

    var secTitle = $("<h2>");
    secTitle.text("5-Day Forecast:");
    secTitle.attr("class", "text-light d-block mx-auto col-12 text-center");

    $("#fiveDay").empty();
    $("#fiveDay").append(secTitle);

    var addDay = 0;

    var queryURl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + apiKey;

    $.ajax({
        url: queryURl,
        method: "GET"
    }).then(function (fiveDayResponse) {

        for (i = 0; i < fiveDayResponse.list.length; i++) {

            if (fiveDayResponse.list[i].dt_txt.indexOf("00:00:00") !== -1) {

                addDay++;

                var today = new Date();
                today.setDate(today.getDate() + addDay)

                var dd = String(today.getDate()).padStart(2, "0");
                var mm = String(today.getMonth() + 1).padStart(2, "0");
                var yyyy = today.getFullYear();

                var todayString = mm + '/' + dd + '/' + yyyy;

                var cardContainer = $("<div>");
                cardContainer.attr("class", "card m-3")

                var cardBody = $("<div>");
                cardBody.attr("class", "card-body");

                var date = $("<h3>");
                date.text(todayString);

                var weatherIcon = $("<img>");
                var iconcode = fiveDayResponse.list[i].weather[0].icon;
                var iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";
                weatherIcon.attr("src", iconurl);

                var cardTemp = $("<p>");
                cardTemp.text("Temperature: " + fiveDayResponse.list[i].main.temp + "°");

                var cardHumi = $("<p>");
                cardHumi.text("Humidity: " + fiveDayResponse.list[i].main.humidity + "%");

                cardBody.append(date);
                cardBody.append(weatherIcon);
                cardBody.append(cardTemp);
                cardBody.append(cardHumi);
                cardContainer.append(cardBody);

                $("#fiveDay").append(cardContainer);

            }
        };

    });
};

async function saveSearches(city) {
    const rawData = await localStorage.getItem("pastSearches");

    if (rawData) {
        const data = JSON.parse(rawData);
        const split = data.includes(city);

        if (split) {
            return
        } else {
            localStorage.setItem("pastSearches", JSON.stringify([...data, city]));
        }

    } else {
        localStorage.setItem("pastSearches", JSON.stringify([city]));
    }
};

function displaySearches() {
    const rawData = localStorage.getItem("pastSearches");
    if (rawData) {
        const unsortedData = JSON.parse(rawData);
        const data = unsortedData.sort();

        let container = $("#pastSearch");

        container.empty();

        data.forEach(city => {
            let cityEl = $("<li>");
            cityEl.text(city)
            cityEl.attr("class", "pastCity");
            container.append(cityEl);
        })


    } else {
        console.log("data does not exist");
    }
};

function show() {
    document.getElementById("sidebar").classList.add("active");
};

$("#search-button").on("click", function () {

    var citySearch = $("#city-input").val().trim();

    currentWeather(citySearch);

    pasteSearch = $("#city-input").val();

    $("#city-input").val("");

});

$("#back").on("click", () => {
    document.getElementById("sidebar").classList.remove("active");
});

displaySearches();

$("#pastSearch").on("click", (e) => {
    currentWeather(e.target.innerText);
    document.getElementById("sidebar").classList.remove("active");
})





// How to get current date
// https://www.w3schools.com/js/js_dates.asp
// https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart

// how to set icons to weather
// https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon



