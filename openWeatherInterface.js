$(document).ready(function () {
    var latitude;
    var longitude;
    getLocation();
    var APIKEY = "7fdc457dab13ca98a759fe00466078b9";
    console.log("API key Loaded!");

    $(".main-Weather").hide();
    $(".secondary-Container").hide();

    //getLocation();
    populateDropdown();

    var messurementsystem = "metric";
    //Current Weather Variables
    var currentDayStatus = document.getElementById("current-Status");
    var currentDayIcon = document.getElementById("current-Status-img");
    var currentDayTemp = document.getElementById("current-Temp");
    var currentDayMinTemp = document.getElementById("minTemp");
    var currentDayMaxTemp = document.getElementById("maxTemp");
    var currentDayHumidity = document.getElementById("humidity");
    var currentDayClouds = document.getElementById("clouds");
    var currentDayWindsSpeed = document.getElementById("wind-Speed");
    var currentDayWindsDir = document.getElementById("wind-Direction");
    //
    //Day 2
    var day2Status = document.getElementById("day2-Status");
    var day2Icon = document.getElementById("day2-Status-img");
    var day2Temp = document.getElementById("day2-temp");
    //
    //Day 3
    var day3Status = document.getElementById("day3-Status");
    var day3Icon = document.getElementById("day3-Status-img");
    var day3Temp = document.getElementById("day3-temp");
    //
    //Day4
    var day4Status = document.getElementById("day4-Status");
    var day4Icon = document.getElementById("day4-Status-img");
    var day4Temp = document.getElementById("day4-temp");
    //
    //Day5
    var day5Status = document.getElementById("day5-Status");
    var day5Icon = document.getElementById("day5-Status-img");
    var day5Temp = document.getElementById("day5-temp");

    var citySearch = document.getElementById("cityName");
    var countrySearch = document.getElementById("countryName");

    $("#system-metric").on("click", function () { setMetric(); })
    $("#system-imperial").on("click", function () { setImperial(); })


    $("#btnSearch").on("click", function () { getWeather(); })


    //Makes the API Call to the Open Weather API
    function getWeather() {
        var city = $("#cityName").val();
        var country = $("#countryName").val();

        $.getJSON("https://api.darksky.net/forecast/"+APIKEY+"/"+latitude+","+longitude+"?exclude=minutely,hourly,alerts,flags", function (weatherData) {
            console.log("Connected!");
            console.log(weatherData);



            $(currentDayStatus).html(weatherData.currently.summary);
            $("#current-Status-img").attr("src", "images/" + weatherData.currently.icon + ".png");
            $(currentDayTemp).html(weatherData.currently.temperature + "&deg");
            $(currentDayMinTemp).html(weatherData.daily.data["0"].temperatureMin + "&deg");
            $(currentDayMaxTemp).html(weatherData.daily.data["0"].temperatureMax + "&deg");
            $(currentDayHumidity).html(weatherData.currently.humidity * 100 + "%");
            $(currentDayClouds).html(weatherData.currently.cloudCover * 100 + "%");
            $(currentDayWindsSpeed).html(weatherData.currently.windSpeed);
            $(currentDayWindsDir).html(getWindDirection(weatherData.currently.windBearing));

            $(day2Status).html(weatherData.daily.data[1].summary);
            $("#day2-Status-img").attr("src", "images/" + weatherData.daily.data[1].icon + ".png");
            $(day2Temp).html(weatherData.daily.data[1].temperatureMin + "&deg -" + weatherData.daily.data[1].temperatureMax + "&deg");
            //
            $(day3Status).html(weatherData.daily.data[2].summary);
            $("#day3-Status-img").attr("src", "images/" + weatherData.daily.data[2].icon + ".png");
            $(day3Temp).html(weatherData.daily.data[2].temperatureMin + "&deg -" + weatherData.daily.data[2].temperatureMax + "&deg");
            //
            $(day4Status).html(weatherData.daily.data[3].summary);
            $("#day4-Status-img").attr("src", "images/" + weatherData.daily.data[3].icon + ".png");
            $(day4Temp).html(weatherData.daily.data[3].temperatureMin + "&deg -" + weatherData.daily.data[3].temperatureMax + "&deg");
            //
            $(day5Status).html(weatherData.daily.data[4].summary);
            $("#day5-Status-img").attr("src", "images/" + weatherData.daily.data[4].icon + ".png");
            $(day5Temp).html(weatherData.daily.data[4].temperatureMin + "&deg -" + weatherData.daily.data[4].temperatureMax + "&deg");
        }
        );

        $(".main-Weather").show();
        $(".secondary-Container").show();

    }
    function getLocation() {
        var options =
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };

        function success(position) {
            var crds = position.coords;
            latitude = crds.latitude;
            longitude = crds.longitude;
            console.log(latitude);
            console.log(longitude);
            getWeather();
        }
        function error(error) {
            alert("Could not get location, please try again or do it manually.");
        }
        navigator.geolocation.getCurrentPosition(success, error, options);



    }


    function getWindDirection(directionNumber) // Change the incoming Wind Direction from degrees to Letters
    {
        if (directionNumber === 0 || directionNumber == 360) {
            return "N";
        }
        if (directionNumber > 0 && directionNumber < 45) {
            return "NNE";
        }
        else if (directionNumber == 45) {
            return "NE";
        }
        else if (directionNumber > 45 && directionNumber < 90) {
            return "ENE";
        }
        else if (directionNumber == 90) {
            return "E";
        }
        else if (directionNumber > 90 && directionNumber < 135) {
            return "ESE";
        }
        else if (directionNumber == 135) {
            return "SE";
        }
        else if (directionNumber > 135 && directionNumber < 180) {
            return "SSE";
        }
        else if (directionNumber == 180) {
            return "S";
        }
        else if (directionNumber > 180 && directionNumber < 225) {
            return "SSW";
        }
        else if (directionNumber == 225) {
            return "SSW";
        }
        else if (directionNumber > 225 && directionNumber < 270) {
            return "WSW";
        }
        else if (directionNumber == 270) {
            return "W";
        }
        else if (directionNumber > 270 && directionNumber < 315) {
            return "WNW";
        }
        else if (directionNumber == 315) {
            return "NW";
        }
        else if (directionNumber > 315 && directionNumber < 360) {
            return "NNW";
        }
    }
    function populateDropdown() //Populate both input box
    {
        var cities = {
            url: "city.list.json",
            getValue: "name",

            list: {
                onClickEvent: function () {
                    longitude = $("#cityName").getSelectedItemData().coord.lon;
                    latitude = $("#cityName").getSelectedItemData().coord.lot;
                    console.log(longitude);
                },


                onSelectItemEvent: function () {
                    var value = $("#cityName").getSelectedItemData().country;


                    $("#countryName").val(value).trigger("change");
                },


                match: {
                    enabled: true

                },
                maxNumberOfElements: 10000
            }
        };


        var country = {
            url: "city.list.json",
            getValue: "country",

            list: {
                onClickEvent: function () {
                    longitude = $("#countryName").getSelectedItemData().coord.lon;
                    latitude = $("#countryName").getSelectedItemData().coord.lat;
                },
                onSelectItemEvent: function () {
                    var value = $("#countryName").getSelectedItemData().name;


                    $("#cityName").val(value).trigger("change");
                },
                match: {
                    enabled: true
                },

                maxNumberOfElements: 10000,
            }
        };

        $("#cityName").easyAutocomplete(cities);
        $("#countryName").easyAutocomplete(country);

    }

    function setMetric() {
        $("#system-imperial").addClass("btn-default");

        $("#system-imperial").removeClass("btn-primary");
        $("#system-metric").removeClass("btn-default")
        $("#system-metric").addClass("btn-primary");
        messurementsystem = "metric";

    }

    function setImperial() {
        $("#system-metric").addClass("btn-default");

        $("#system-metric").removeClass("btn-primary");
        $("#system-imperial").removeClass("btn-default");
        $("#system-imperial").addClass("btn-primary");
        messurementsystem = "imperial";
    }

});




