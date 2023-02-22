let apiKey="fc26d0c630f53a8cc7245122c5d0f9e5";


$("#search").on("click", ()=> {
    let searchInput = $("#search-input");
    let userCity = searchInput.val();
    var geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${userCity},&limit=1&appid=${apiKey}`;

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

            let cityName = data.name;
            //console.log(cityName)
            $(".city-name").append(cityName);

            let currentTemp = data.main.temp;
            // console.log(currentTemp);
            $("#currentTemp").append("Temperature: ", currentTemp);

            let weatherConditions = data.weather[0].main;
            // console.log("Test: ", weatherConditions);
            $("#currentCond").append("Conditions: ", weatherConditions);


           let windSpeed = data.wind.speed;
            //console.log ('wind speed ', windSpeed)
            $("#currentWindSpeed").append("Wind Speed: ", windSpeed);

           let humidity = data.main.humidity;
            //console.log ('humidity', humidity)
            $("#currentHumidity").append("Humidity: ", humidity);

        });

    
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
            // console.log(dayFiveWeather)
        })  
    })





})
