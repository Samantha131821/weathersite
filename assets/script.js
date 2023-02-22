let apiKey="fc26d0c630f53a8cc7245122c5d0f9e5";

let today = dayjs();
let currentDay = $('#currentDate');
currentDay.text(today.format('dddd'));


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
            // console.log('currentData: ', data);

            let cityName = data.name;
            $(".city-name").append(cityName);

            let currentTemp = data.main.temp;
            $("#currentTemp").append("<b>Temperature: </b>", currentTemp);

            let weatherConditions = data.weather[0].main;
            $("#currentCond").append("<b>Conditions: </b>", weatherConditions);


           let windSpeed = data.wind.speed;
            $("#currentWindSpeed").append("<b>Wind Speed: </b>", windSpeed);

           let humidity = data.main.humidity;
            $("#currentHumidity").append("<b>Humidity: </b>", humidity);

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
            
            // Day One
            let dayOneTemp = dayOneWeather.main.temp;
            $("#futureTemp1").append("<b>Temperature: </b>", dayOneTemp);

            let weatherCond1 = dayOneWeather.weather[0].main;
            $("#futureCond1").append("<b>Conditions: </b>", weatherCond1);

            // Day Two
            let dayTwoTemp = dayTwoWeather.main.temp;
            $("#futureTemp2").append("<b>Temperature: <br></b>", dayTwoTemp);

            let weatherCond2 = dayTwoWeather.weather[0].main;
            $("#futureCond2").append("<b>Conditions: </b>", weatherCond2);


            // Day Three
            let dayThreeTemp = dayThreeWeather.main.temp;
            $("#futureTemp3").append("<b>Temperature: </b>", dayThreeTemp);
           
            let weatherCond3 = dayThreeWeather.weather[0].main;
            $("#futureCond3").append("<b>Conditions: </b>", weatherCond3);


            // Day Four
            let dayFourTemp = dayFourWeather.main.temp;
            $("#futureTemp4").append("<b>Temperature: </b>", dayFourTemp);

            let weatherCond4 = dayFourWeather.weather[0].main;
            $("#futureCond4").append("<b>Conditions: </b>", weatherCond4);

            // Day Five
            let dayFiveTemp = dayFiveWeather.main.temp;
            $("#futureTemp5").append("<b>Temperature: </b>", dayFiveTemp);

            let weatherCond5 = dayFiveWeather.weather[0].main;
            $("#futureCond5").append("<b>Conditions: </b>", weatherCond5);


        })  
    })





})
