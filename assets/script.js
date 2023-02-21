let apiKey="fc26d0c630f53a8cc7245122c5d0f9e5";

let forecastWeather = []


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
        let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        $.ajax({
            url:forecastUrl,
            method:'GET'

        })
        .then((data) => {
            console.log('data: ', data);

            let cityName = data.city.name;
            //console.log(cityName)

            let weatherConditions = data.list[0].weather[0].main;
            //console.log('Conditions', weatherConditions)

           let windSpeed = data.list[0].wind.speed;
            //console.log ('wind speed ', windSpeed)

           let humidity = data.list[0].main.humidity;
            //console.log ('humidity', humidity)
            
           forecastWeather.push(data.list)

        
            for (let i = 0; i < forecastWeather.length; i++) {
                // console.log(forecastWeather[i][0].main.temp)
                let tempFarenheit =  1.8*(forecastWeather[i][0].main.temp-273) + 32; 
                // console.log('temp in farenheit: ', Math.floor(tempFarenheit))

            }
        
        })

        // $(document).ready(function(){
        //     $('city-name').append() 
        // })

    })





})
