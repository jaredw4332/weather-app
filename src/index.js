import './style.css';

const getWeather = async () => {
    try {
        let city = getSearch()
        if (city == '') { city = 'Valetta' }
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=435784523dbad895916dd547dcc4f17f`, {mode: 'cors'})
        const weatherData = await response.json()
        if (weatherData.cod == '404') {
            throw "We couldn't find that city. Try again?"
        } else {
            displayHandler(weatherData, city)
        }
    }

    catch(error) {
        alert(error)
    }
}

const displayHandler = (weather, cityName) => {
    const newTemp = tempConvertK(weather.main.temp, 'C')
    const tempDesc = weather.weather[0].description
    const tempIcon = weather.weather[0].icon
    cityName = titleString(cityName)
    displayWeather(newTemp, tempDesc, tempIcon, cityName)

    const tempFeel = tempConvertK(weather.main.feels_like, 'C')
    const minTemp = tempConvertK(weather.main.temp_min, 'C')
    const maxTemp = tempConvertK(weather.main.temp_max, 'C')
    displayAltWeather(tempFeel, minTemp, maxTemp, weather.main.humidity)

    displayWind(weather.wind)
}

const getSearch = () => {
    let city = search.value
    search.value = ''
    city.split('').forEach(letter => {
        if (letter === " ") {
          letter = "+"
        }
      });
      return city
}

const tempConvertK = (num, temp) => {
    let value
    if (temp == "C") {
        value = (num - 273.15).toFixed(0)
        value = `${value}°C`
        return value
    } else if (temp == "F") {
        value = (1.8 *(num - 273) + 32).toFixed(0)
        value = `${value}°F`
        return value
    }
}

const tempConvertCF = (num, current) => {
    let value
    if (current == "C") {
        value = ((num * (9 / 5)) + 32).toFixed(0)
        value = `${value}°F`
        return value
    } else if (current == "F") {
        value = ((num - 32) * (5 / 9)).toFixed(0)
        value = `${value}°C`
        return value
    }
}

const switchTempStyle = (current) => {
    if (current == "F") {
        tempSwitchF.style.filter = "opacity(0.15)"
        tempSwitchC.style.filter = "opacity(1)"
    } else if (current == "C") {
        tempSwitchC.style.filter = "opacity(0.15)"
        tempSwitchF.style.filter = "opacity(1)"
    }
}

const switchTemp = () => {
    const tempCollection = document.getElementsByClassName('degrees')
    for (let item in tempCollection) {
        if (item == 'length') {
            return
        }
        let num = tempCollection[item].textContent
        let temp = num.substring(num.length-1)

        num = num.slice(0, -2)
        num = Number(num)
        num = tempConvertCF(num, temp)
        switchTempStyle(temp)

        tempCollection[item].textContent = num
    }
}

tempSwitch.addEventListener("click", switchTemp)

const titleString = (string) => {
    string = string.toLowerCase()
    string = string.split(' ')
    string = string.map(function(word) {
        return (word.charAt(0).toUpperCase() + word.slice(1))
    })
    return string.join(' ')
}

const displayWeather = (temp, tempDesc, tempIcon, cityName) => {
    weatherBox.replaceChildren()
    displayThing('cityName', 'p', cityName, 0, weatherBox)
    displayThing('tempInfo', 'h1', temp, 'degrees', weatherBox)
    displayThing('tempDesc', 'p', tempDesc, 0, weatherBox)
    displayThing(tempIcon, 'div', 0, 'icon', weatherBox)
    setContentBackGround(tempIcon)
}

const setContentBackGround = (id) => {
    if (content.classList.contains(`${id}background`)) {
        return
    }
    else {
        content.removeAttribute('class')
        content.classList.add(`${id}background`)
    }
}

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
    if (document.getElementById(name)) {
        document.getElementById(name).remove()
    }
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