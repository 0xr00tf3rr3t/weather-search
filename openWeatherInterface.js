$(document).ready(function () {
    
    var APIKEY = "abe94c2d64b3e37c895d48a461c7cec5";
    console.log("API key Loaded!");

    $(".main-Weather").hide();
    $(".secondary-Container").hide();
    
   getLocation();
    populateDropdown();
         
      var messurementsystem="metric";
        //Current Weather Variables
        var currentDayStatus=document.getElementById("current-Status");
        var currentDayIcon=document.getElementById("current-Status-img");
        var currentDayTemp=document.getElementById("current-Temp");
        var currentDayMinTemp=document.getElementById("minTemp");
        var currentDayMaxTemp=document.getElementById("maxTemp");
        var currentDayHumidity=document.getElementById("humidity");
        var currentDayClouds=document.getElementById("clouds");
        var currentDayWindsSpeed=document.getElementById("wind-Speed");
        var currentDayWindsDir=document.getElementById("wind-Direction");
        //
        //Day 2
         var day2Status=document.getElementById("day2-Status");
        var day2Icon=document.getElementById("day2-Status-img");
        var day2Temp=document.getElementById("day2-temp");
        //
        //Day 3
        var day3Status=document.getElementById("day3-Status");
        var day3Icon=document.getElementById("day3-Status-img");
        var day3Temp=document.getElementById("day3-temp");
        //
        //Day4
        var day4Status=document.getElementById("day4-Status");
        var day4Icon=document.getElementById("day4-Status-img");
        var day4Temp=document.getElementById("day4-temp");
        //
        //Day5
        var day5Status=document.getElementById("day5-Status");
        var day5Icon=document.getElementById("day5-Status-img");
        var day5Temp=document.getElementById("day5-temp");

        var citySearch=document.getElementById("cityName");
        var countrySearch=document.getElementById("countryName");

$("#system-metric").on("click",function(){setMetric();})
$("#system-imperial").on("click",function(){setImperial();})

    $("#btnSearch").on("click",function(){getWeather();})


    //Makes the API Call to the Open Weather API
    function getWeather() {
        var city =$("#cityName").val();
            var country=$("#countryName").val();

        $.getJSON("http://api.openweathermap.org/data/2.5/forecast/daily?q="+city+","+country+"&cnt=6&units="+messurementsystem +"&appid="+APIKEY, function (json) {
            console.log("Connected!");
            console.log(json.list);
            console.log("http://api.openweathermap.org/data/2.5/forecast/daily?q="+city+","+country+"&cnt=6&units="+messurementsystem +"&appid="+APIKEY)

            $(currentDayStatus).html(json.list[0].weather[0].main);
            $("#current-Status-img").attr("src","images/"+json.list["0"].weather["0"].icon+".png");
            $(currentDayTemp).html(json.list[0].temp.day+"&deg");
            $(currentDayMinTemp).html(json.list[0].temp.min+"&deg");
            $(currentDayMaxTemp).html(json.list[0].temp.max+"&deg");
            $(currentDayHumidity).html(json.list[0].humidity+"%");
            $(currentDayClouds).html(json.list[0].clouds+"%");
            $(currentDayWindsSpeed).html(json.list[0].speed);
            $(currentDayWindsDir).html(getWindDirection(json.list[0].deg)); 

            $(day2Status).html(json.list[1].weather["0"].main);
            $("#day2-Status-img").attr("src","images/"+json.list["1"].weather["0"].icon+".png");
            $(day2Temp).html(json.list[1].temp.day+"&deg");
            //
             $(day3Status).html(json.list[2].weather["0"].main);
            $("#day3-Status-img").attr("src","images/"+json.list["2"].weather["0"].icon+".png");
            $(day3Temp).html(json.list[2].temp.day+"&deg");
            //
             $(day4Status).html(json.list[3].weather["0"].main);
            $("#day4-Status-img").attr("src","images/"+json.list["3"].weather["0"].icon+".png");
            $(day4Temp).html(json.list[3].temp.day+"&deg");
            //
            $(day5Status).html(json.list[4].weather["0"].main);
            $("#day5-Status-img").attr("src","images/"+json.list["3"].weather["0"].icon+".png");
            $(day5Temp).html(json.list[4].temp.day+"&deg");
        });
         $(".main-Weather").show();
       $(".secondary-Container").show();
       json=null;
    }
    function getLocation()
    {
     $.getJSON("http://ip-api.com/json",function (json){

    $("#cityName").val(json.city);
    $("#countryName").val(json.countryCode);
     });
    }

    function getWindDirection(directionNumber) // Change the incoming Wind Direction from degrees to Letters
    {
        if (directionNumber==0||directionNumber==360)
            {``
                return "N";
            }
        if (directionNumber>0 && directionNumber<45)
            {
                return "NNE";
            }
        else if (directionNumber==45)
            {
                return "NE";  
            }
        else if (directionNumber>45 && directionNumber<90)
            {
                return "ENE";
            }
        else if (directionNumber==90)
            {
                return  "E";
            }
        else if (directionNumber>90 && directionNumber<135)
            {
                return "ESE";
            }
        else if (directionNumber==135)
            {
                return "SE";
            }
        else if (directionNumber>135 && directionNumber<180)
            {
                return "SSE";
            }
         else if (directionNumber==180)
            {
                return "S";
            }
        else if (directionNumber>180 && directionNumber<225)
            {
                return "SSW";
            }
        else if (directionNumber==225)
            {
                return "SSW";
            }
        else if (directionNumber>225 && directionNumber<270)
            {
                return "WSW";
            }
        else if (directionNumber==270)
            {
                return "W";
            }
        else if (directionNumber>270 && directionNumber<315)
            {
                return "WNW";
            }
          else if (directionNumber==315)
            {
                return "NW";
            }
         else if (directionNumber>315 && directionNumber<360)
            {
                return "NNW";
            }
    }
    function populateDropdown() //Populate both input box
    {    
        var cities={
            url:"city.list.json",
            getValue:"name",
           
            list:{
                onSelectItemEvent: function() {
			var value = $("#cityName").getSelectedItemData().country;

			$("#countryName").val(value).trigger("change");
                }
            ,
                    match:{
                        enabled:true
                        
                    },
                    maxNumberOfElements: 10000
            }
        };

        var country={
            url:"city.list.json",
            getValue:"country",
           
            list:{
                onSelectItemEvent: function() {
			var value = $("#countryName").getSelectedItemData().name;

			$("#cityName").val(value).trigger("change");
                },
                    match:{
                        enabled:true
                    },

		maxNumberOfElements: 10000,
            }
        };

        $("#cityName").easyAutocomplete(cities);
        $("#countryName").easyAutocomplete(country);
  
    }

    function setMetric()
    {
        $("#system-imperial").addClass("btn-default");
     
       $("#system-imperial").removeClass("btn-primary");
       $("#system-metric").removeClass("btn-default")
     $("#system-metric").addClass("btn-primary");
       messurementsystem="metric";
        
    }

    function setImperial()
    {
           $("#system-metric").addClass("btn-default");
     
       $("#system-metric").removeClass("btn-primary");
       $("#system-imperial").removeClass("btn-default");
     $("#system-imperial").addClass("btn-primary");
       messurementsystem="imperial";
    }
    
})

     
           
        
