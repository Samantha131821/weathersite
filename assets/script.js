let apiKey="fc26d0c630f53a8cc7245122c5d0f9e5";
let storedWeather = JSON.parse(localStorage.getItem("weather")) || [];


$("#search").on("click", ()=> {
    let searchInput = $("#search-input");
    let userCity = searchInput.val();
    var geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${userCity},&limit=1&appid=${apiKey}`;
    
    
 

    // Current Forecast

    $.ajax({
        url:geoUrl,
        method:'GET'
    })

    .then((res) => {
        console.log('response:', res)
        let lat = res[0].lat;
        let lon = res[0].lon;
        var currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
        let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

        $.ajax({
            url:currentUrl,
            method:'GET'

        })
        .then((data) => {
            console.log('currentData: ', data);
            
            //$("#info").empty();

            let today = dayjs();
            let currentDay = $('#currentDate');
            currentDay.text(today.format('M/D/YYYY'));

            let cityName = data.name;
            $(".city-name").html(cityName);

            let currentTemp = data.main.temp;
            $("#currentTemp").html(Math.floor(currentTemp) + "°");

            let weatherConditions = data.weather[0].main;
            $("#currentCond").html("<b>Conditions: </b>" + weatherConditions);
        

            // Weather Conditions icon- current weather
            let imgIcon = data.weather[0].icon; 
            let imgUrl = "http://openweathermap.org/img/wn/" + imgIcon + ".png";
            $("#current-weather-icon").attr('src', imgUrl);
            
    

           let windSpeed = data.wind.speed;
            $("#currentWindSpeed").html("<b>Wind: </b>" + windSpeed + " mph");

           let humidity = data.main.humidity;
            $("#currentHumidity").html("<b>Humidity: </b>" + humidity);

            updateStoredCities(cityName)
        });

    
        function updateStoredCities(cityName){
            let storedCities = JSON.parse(localStorage.getItem("cityName")) || [];
            let previousSearches = $("#searchHistory")

            storedCities.unshift(cityName)
            if (storedCities.length === 6) {
                storedCities.pop();
                
            }
            localStorage.setItem("cityName", JSON.stringify(storedCities))
            console.log(storedCities)
            // when searches gets to 5 remove oldest search
            previousSearches.empty();

            for (let i = 0; i < storedCities.length; i++) {
                let searchHistory = $(`<button>${storedCities[i]}</button>`)
                previousSearches.append(searchHistory);
                
            }
        }
      

        // 5 Day Forecast

        $.ajax({
            url:forecastUrl,
            method:'GET'

        })
        .then((data) =>{

            
            

            for (let i = 0; i < array.length; i+8) {
                let forecastWeather = data.list[i]
                let dayTemp = forecastWeather.main.temp;
                let weatherCond = forecastWeather.weather[0].main;
                let windSpeed = forecastWeather.wind.speed;
                let humidity = forecastWeather.main.humidity;
                let imgIcon = forecastWeather.weather[0].icon; 
                let imgUrl = "http://openweathermap.org/img/w/" + imgIcon +".png";
                let dateTxt = new Date(forecastWeather.dt_txt).toLocaleDateString();
              
                $("#futureTemp1").append(Math.floor(dayTemp) + "°");
                $("#futureCond1").append("<b>Conditions: </b>", weatherCond);
                $("#futureWindSpeed1").append("<b>Wind: </b>", windSpeed + " mph");
                $("#futureHumidity1").append("<b>Humidity: </b>", humidity);
                $("#weather-icon1").attr('src', imgUrl);
                $("#dayOne > .futureDate").text(dateTxt);
                
            }

            // Day One
            let dayOneTemp = dayOneWeather.main.temp;
            $("#futureTemp1").append(Math.floor(dayOneTemp) + "°");

            let weatherCond1 = dayOneWeather.weather[0].main;
            $("#futureCond1").append("<b>Conditions: </b>", weatherCond1);

            let windSpeed1 = dayOneWeather.wind.speed;
            $("#futureWindSpeed1").append("<b>Wind: </b>", windSpeed1 + " mph");

            let humidity1 = dayOneWeather.main.humidity;
            $("#futureHumidity1").append("<b>Humidity: </b>", humidity1);

            let imgIcon1 = dayOneWeather.weather[0].icon; 
            let imgUrl1 = "http://openweathermap.org/img/w/" + imgIcon1 +".png";
            $("#weather-icon1").attr('src', imgUrl1);
           
            // console.log($("#dayOne > .futureDate"))
            let dateTxt1 = new Date(dayOneWeather.dt_txt).toLocaleDateString();
            $("#dayOne > .futureDate").text(dateTxt1);

            // Day Two
            let dayTwoTemp = dayTwoWeather.main.temp;
            $("#futureTemp2").append(Math.floor(dayTwoTemp) + "°");

            let weatherCond2 = dayTwoWeather.weather[0].main;
            $("#futureCond2").append("<b>Conditions: </b>", weatherCond2);

            
            let windSpeed2 = dayTwoWeather.wind.speed;
            $("#futureWindSpeed2").append("<b>Wind: </b>", windSpeed2 + " mph");

            let humidity2 = dayTwoWeather.main.humidity;
            $("#futureHumidity2").append("<b>Humidity: </b>", humidity2);

            let imgIcon2 = dayTwoWeather.weather[0].icon; 
            let imgUrl2 = "http://openweathermap.org/img/w/" + imgIcon2 +".png";
            $("#weather-icon2").attr('src', imgUrl2);
    
            let dateTxt2 = new Date(dayTwoWeather.dt_txt).toLocaleDateString();
            $("#dayTwo > .futureDate").text(dateTxt2);

            // Day Three
            let dayThreeTemp = dayThreeWeather.main.temp;
            $("#futureTemp3").append(Math.floor(dayThreeTemp) + "°");
           
            let weatherCond3 = dayThreeWeather.weather[0].main;
            $("#futureCond3").append("<b>Conditions: </b>", weatherCond3);

            
            let windSpeed3 = dayThreeWeather.wind.speed;
            $("#futureWindSpeed3").append("<b>Wind: </b>", windSpeed3 + " mph");

            let humidity3 = dayThreeWeather.main.humidity;
            $("#futureHumidity3").append("<b>Humidity: </b>", humidity3);

            let imgIcon3 = dayThreeWeather.weather[0].icon; 
            let imgUrl3 = "http://openweathermap.org/img/w/" + imgIcon3 +".png";
            $("#weather-icon3").attr('src', imgUrl3);

            let dateTxt3 = new Date(dayThreeWeather.dt_txt).toLocaleDateString();
            $("#dayThree> .futureDate").text(dateTxt3);
           
            // Day Four
            let dayFourTemp = dayFourWeather.main.temp;
            $("#futureTemp4").append(Math.floor(dayFourTemp) + "°");

            let weatherCond4 = dayFourWeather.weather[0].main;
            $("#futureCond4").append("<b>Conditions: </b>", weatherCond4);
            
            let windSpeed4 = dayFourWeather.wind.speed;
            $("#futureWindSpeed4").append("<b>Wind: </b>", windSpeed4 + " mph");

            let humidity4 = dayFourWeather.main.humidity;
            $("#futureHumidity4").append("<b>Humidity: </b>", humidity4);

            let imgIcon4 = dayFourWeather.weather[0].icon; 
            let imgUrl4 = "http://openweathermap.org/img/w/" + imgIcon4 +".png";
            $("#weather-icon4").attr('src', imgUrl4);

            let dateTxt4 = new Date(dayFourWeather.dt_txt).toLocaleDateString();
            $("#dayFour> .futureDate").text(dateTxt4);
          

            // Day Five
            let dayFiveTemp = dayFiveWeather.main.temp;
            $("#futureTemp5").append(Math.floor(dayFiveTemp) + "°");

            let weatherCond5 = dayFiveWeather.weather[0].main;
            $("#futureCond5").append("<b>Conditions: </b>", weatherCond5);

            let windSpeed5 = dayFiveWeather.wind.speed;
            $("#futureWindSpeed5").append("<b>Wind: </b>", windSpeed5) + " mph";

            let humidity5 = dayFiveWeather.main.humidity;
            $("#futureHumidity5").append("<b>Humidity: </b>", humidity5);

            let imgIcon5 = dayFiveWeather.weather[0].icon; 
            let imgUrl5 = "http://openweathermap.org/img/w/" + imgIcon5 +".png";
            $("#weather-icon5").attr('src', imgUrl5);

            let dateTxt5 = new Date(dayFiveWeather.dt_txt).toLocaleDateString();
            $("#dayFive> .futureDate").text(dateTxt5);
          
        })  
    
    })

    

})
