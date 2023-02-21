let apiKey="fc26d0c630f53a8cc7245122c5d0f9e5";
var listEl = $("#result-content");

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
            //console.log('data: ', data);
            let cityName = data.city.name;
            forecastWeather.push(data.list)

            //console.log('city name: ',cityName)

            //console.log('forecast weather: ', forecastWeather)

            for (let i = 0; i < forecastWeather.length; i++) {
                console.log(forecastWeather[i][0].main.temp)
                let tempFarenheit =  1.8*(forecastWeather[i][0].main.temp-273) + 32; 
                console.log('temp in farenheit: ', Math.floor(tempFarenheit))
                
            }

        })

    })










})











// fetch(requestUrl)
//     .then(function(response) {
//     return response.json();
//     console.log(data);
// })

