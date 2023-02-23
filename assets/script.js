let apiKey="fc26d0c630f53a8cc7245122c5d0f9e5";

let today = dayjs();
let currentDay = $('#currentDate');
currentDay.text(today.format('dddd'));



$("#search").on("click", ()=> {
    let searchInput = $("#search-input");
    let userCity = searchInput.val();
    var geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${userCity},&limit=1&appid=${apiKey}`;
    // localStorage.setItem('searchHistory ', userCity);
    // localStorage.getItem('searchHistory');
    

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
        // console.log('currentData: ', data);
            

            let cityName = data.name;
            $(".city-name").append(cityName);

            let currentTemp = data.main.temp;
            $("#currentTemp").append("<b>Temperature: </b>", Math.floor(currentTemp));

            let weatherConditions = data.weather[0].main;
            $("#currentCond").append("<b>Conditions: </b>", weatherConditions);
        

            // Weather Conditions icon
            if (weatherConditions === 'Clouds') {
                $("#current-weather-icon").append("🌥");
            } else if (weatherConditions === 'Clear'){
                $("#current-weather-icon").append("🌞");
            } else if (weatherConditions === 'Rain') {
                $("#current-weather-icon").append("🌧");
            }

           let windSpeed = data.wind.speed;
            $("#currentWindSpeed").append("<b>Wind Speed: </b>", windSpeed + " mph");

           let humidity = data.main.humidity;
            $("#currentHumidity").append("<b>Humidity: </b>", humidity);

    
        });

    


        // 5 Day Forecast

        $.ajax({
            url:forecastUrl,
            method:'GET'

        })
        .then((data) =>{
            console.log("forecastData: ", data)
            const dayOneWeather = data.list[0]
            const dayTwoWeather = data.list[8]
            const dayThreeWeather = data.list[16]
            const dayFourWeather = data.list[24]
            const dayFiveWeather = data.list[32]
            
    
            // let futureDays = []

            // for (let i = 0; i < currentDay; i++) {
            //     console.log(futureDays)
            //     $('.futureDate').append(futureDays)

            // }


            // Day One
            let dayOneTemp = dayOneWeather.main.temp;
            $("#futureTemp1").append("<b>Temperature: </b>", Math.floor(dayOneTemp));

            let weatherCond1 = dayOneWeather.weather[0].main;
            $("#futureCond1").append("<b>Conditions: </b>", weatherCond1);

            let windSpeed1 = dayOneWeather.wind.speed;
            $("#futureWindSpeed1").append("<b>Wind Speed: </b>", windSpeed1 + " mph");

            let humidity1 = dayOneWeather.main.humidity;
            $("#futureHumidity1").append("<b>Humidity: </b>", humidity1);

            // Day Two
            let dayTwoTemp = dayTwoWeather.main.temp;
            $("#futureTemp2").append("<b>Temperature: </b>", Math.floor(dayTwoTemp));

            let weatherCond2 = dayTwoWeather.weather[0].main;
            $("#futureCond2").append("<b>Conditions: </b>", weatherCond2);

            
            let windSpeed2 = dayTwoWeather.wind.speed;
            $("#futureWindSpeed2").append("<b>Wind Speed: </b>", windSpeed2 + " mph");

            let humidity2 = dayTwoWeather.main.humidity;
            $("#futureHumidity2").append("<b>Humidity: </b>", humidity2);


            // Day Three
            let dayThreeTemp = dayThreeWeather.main.temp;
            $("#futureTemp3").append("<b>Temperature: </b>", Math.floor(dayThreeTemp));
           
            let weatherCond3 = dayThreeWeather.weather[0].main;
            $("#futureCond3").append("<b>Conditions: </b>", weatherCond3);

            
            let windSpeed3 = dayThreeWeather.wind.speed;
            $("#futureWindSpeed3").append("<b>Wind Speed: </b>", windSpeed3 + " mph");

            let humidity3 = dayThreeWeather.main.humidity;
            $("#futureHumidity3").append("<b>Humidity: </b>", humidity3);

            // Day Four
            let dayFourTemp = dayFourWeather.main.temp;
            $("#futureTemp4").append("<b>Temperature: </b>", Math.floor(dayFourTemp));

            let weatherCond4 = dayFourWeather.weather[0].main;
            $("#futureCond4").append("<b>Conditions: </b>", weatherCond4);
            
            let windSpeed4 = dayFourWeather.wind.speed;
            $("#futureWindSpeed4").append("<b>Wind Speed: </b>", windSpeed4 + " mph");

            let humidity4 = dayFourWeather.main.humidity;
            $("#futureHumidity4").append("<b>Humidity: </b>", humidity4);

            // Day Five
            let dayFiveTemp = dayFiveWeather.main.temp;
            $("#futureTemp5").append("<b>Temperature: </b>", Math.floor(dayFiveTemp));

            let weatherCond5 = dayFiveWeather.weather[0].main;
            $("#futureCond5").append("<b>Conditions: </b>", weatherCond5);

            let windSpeed5 = dayFiveWeather.wind.speed;
            $("#futureWindSpeed5").append("<b>Wind Speed: </b>", windSpeed5) + " mph";

            let humidity5 = dayFiveWeather.main.humidity;
            $("#futureHumidity5").append("<b>Humidity: </b>", humidity5);


            
            // /icons
            conditionsArray = [weatherCond1, weatherCond2, weatherCond3, weatherCond4, weatherCond5];

            for (let i = 0; i < conditionsArray.length; i++) {
                console.log(conditionsArray)
                
                if (conditionsArray[i] === 'Clouds') {
                    $(".weather-icon").append("🌥");
                } else if(conditionsArray[i] === 'Clear'){
                    $(".weather-icon").append("🌞");
                } else if (conditionsArray[i] === 'Rain') {
                    $(".weather-icon").append("🌧");
                }
                
            }
            
        })  
    })

   

    //clear so if user searchs again it refreshes



})
