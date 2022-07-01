import './style.css';

const getWeather = async () => {
    try {
      const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=London&APPID=435784523dbad895916dd547dcc4f17f', {mode: 'cors'})
      const responseData = await response.json()
      console.log(responseData)
    }

    catch(error) {
      alert("No weather")
    }
}

getWeather()