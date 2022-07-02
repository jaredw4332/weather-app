import './style.css';

const getWeather = async () => {
    try {
        const city = getSearch()
    //    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=435784523dbad895916dd547dcc4f17f`, {mode: 'cors'})
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=malmo&APPID=435784523dbad895916dd547dcc4f17f`, {mode: 'cors'})
        const weatherData = await response.json()
        if (weatherData.cod == '404') {
            throw 'Not a valid city'
        }
        const newTemp = tempConvert(weatherData.main.temp, 'c')
        displayWeather(newTemp)
    }

    catch(error) {
        console.log(error)
    }
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
        value = (num - 273.15)
    } else if (temp == "f") {
        value = (1.8 *(num - 273) + 32)
    }
    return value.toFixed(2)
}

const displayWeather = (temp) => {
    const weather = document.createElement('h1')
    weather.textContent = temp
    content.appendChild(weather)
}


searchButton.addEventListener("click", getWeather)

getWeather()