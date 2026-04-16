function fuzzify(temp) {

    let cold = Math.max(0, Math.min(1, (20 - temp) / 10));

    let warm = Math.max(
        0,
        Math.min((temp - 15) / 10, (30 - temp) / 10)
    );

    let hot = Math.max(0, Math.min(1, (temp - 25) / 10));

    return { cold: cold, warm: warm, hot: hot };
}


function decideSpeed(temp) {

    let values = fuzzify(temp);

    if (values.cold >= values.warm && values.cold >= values.hot) {
        return "Low Speed";
    }
    else if (values.warm >= values.cold && values.warm >= values.hot) {
        return "Medium Speed";
    }
    else {
        return "High Speed";
    }
}


function getTemperature() {

    if (!navigator.geolocation) {
        alert("Geolocation not supported");
        return;
    }

    navigator.geolocation.getCurrentPosition(function(position) {

        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        let url =
        "https://api.open-meteo.com/v1/forecast?latitude="
        + lat +
        "&longitude="
        + lon +
        "&current_weather=true";

        fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            let temp = data.current_weather.temperature;

            document.getElementById("temp").innerText =
            "Temperature: " + temp + " °C";

            let speed = decideSpeed(temp);

            document.getElementById("speed").innerText =
            "Fan Speed: " + speed;

        })
        .catch(function(error) {

            alert("Weather data fetch failed");

            console.log(error);

        });

    });

}