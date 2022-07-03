import './style.css';

const getWeather = async () => {
    try {
        const city = getSearch()
    //    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=435784523dbad895916dd547dcc4f17f`, {mode: 'cors'})
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=regina&APPID=435784523dbad895916dd547dcc4f17f`, {mode: 'cors'})
        const weatherData = await response.json()
        if (weatherData.cod == '404') {
            throw 'Not a valid city'
        } else {
            displayHandler(weatherData, city)
        }
    }

    catch(error) {
        console.log(error)
    }
}

const displayHandler = (weather, cityName) => {
    const newTemp = tempConvert(weather.main.temp, 'c')
    const tempDesc = weather.weather[0].description
    const tempIcon = weather.weather[0].icon
    cityName = titleString(cityName)
    displayWeather(newTemp, tempDesc, tempIcon, cityName)

    const tempFeel = tempConvert(weather.main.feels_like, 'c')
    const minTemp = tempConvert(weather.main.temp_min, 'c')
    const maxTemp = tempConvert(weather.main.temp_max, 'c')
    displayAltWeather(tempFeel, minTemp, maxTemp, weather.main.humidity)

    displayWind(weather.wind)
}

const getSearch = () => {
    let city = search.value
    city.split('').forEach(letter => {
        if (letter === " ") {
          letter = "+"
        }
      });
      return city
}

const tempConvert = (num, temp) => {
    let value
    if (temp == "c") {
        value = (num - 273.15).toFixed(0)
        value = `${value}°C`
        return value
    } else if (temp == "f") {
        value = (1.8 *(num - 273) + 32).toFixed(0)
        value = `${value}°F`
        return value
    }
}

// doesnt work
const titleString = (string) => {
    for (let spot in string) {
        if ([spot] === 0) {
            string.charAt(spot).toUpperCase() + string.slice(1)
        } else {
            string.charAt(spot).toLowerCase() + string.slice(1)
        }
    }
    return string
}

// celcius to fahrenheit swap button to grab degree class, cut off last 2 characters,
// convert to number and run it through tempConvert with an f

const displayWeather = (temp, tempDesc, tempIcon, cityName) => {
    displayThing('cityName', 'p', 'Temporary', 0, weatherBox)
    displayThing('tempInfo', 'h1', temp, 'degrees', weatherBox)
    displayThing('tempDesc', 'p', tempDesc, 0, weatherBox)
    displayThing(tempIcon, 'div', 0, 'icon', weatherBox)
}

//change background image of content based on icon returned

const displayAltWeather = (tempFeel, tempLow, tempHigh, humidity) => {
    displayThing('tempFeel', 'p', tempFeel, 'degrees', feelsLike)
    displayThing('tempLow', 'p', tempLow, 'degrees', minTemp)
    displayThing('tempHigh', 'p', tempHigh, 'degrees', maxTemp)
    displayThing('humidity', 'p', `${humidity}%`, 0, humidityBox)
}

const displayWind = (wind) => {
    displayThing('windSpeed', 'p', `${wind.speed} m/s`, 0, windSpeedBox)
    displayThing('windDirection', 'p', `${wind.deg}°`, 0, windDirectionBox)
    displayThing('windGust', 'p', wind.gust, 0, windGustBox)
}

const displayThing = (name, type, text, group, parent) => {
    if (text == undefined) {
        parent.style.display = 'none'
        return
    }
    let id = name
    name = document.createElement(type)
    name.setAttribute("id", id)
    if (text != 0) { name.textContent = text }
    if (group != 0) { name.classList.add(group) }
    parent.appendChild(name)
}

searchButton.addEventListener("click", getWeather)

getWeather()