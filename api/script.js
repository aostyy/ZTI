const input = document.querySelector('input');
const button = document.querySelector('button');
const errorMsg = document.querySelector('p.error_message');
const cityName = document.querySelector('h2.city_name');
const weatherImg = document.querySelector('img');
const temp = document.querySelector('p.temp');
const description = document.querySelector('p.description');
const feelslike = document.querySelector('span.feels_like');
const pressure = document.querySelector('.pressure');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind_speed');
const visibility = document.querySelector('.visibility');
const clouds = document.querySelector('.clouds');

const apiInfo = {
    link : 'https://api.openweathermap.org/data/2.5/weather?q=',
    key : '&appid=410f333782496dfd52e0c1e055042b3f',
    units : '&units=metric',
    lang : '&lang=pl'
}

function getWeatherInfo (){
    const apiInfoCity = input.value || "Gdynia";
    console.log(apiInfoCity); //uhh
    const URL = `${apiInfo.link}${apiInfoCity}${apiInfo.key}${apiInfo.units}${apiInfo.lang}`;
    console.log(URL);

    axios.get(URL).then((response) => {
        console.log(response);

        weatherImg.src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
        cityName.textContent = `${response.data.name}, ${response.data.sys.country}`;
        temp.textContent = `${Math.round(response.data.main.temp)} ℃`;
        description.textContent = `${response.data.weather[0].description}`;
        feelslike.textContent = `${Math.round(response.data.main.feels_like)} ℃`;
        pressure.textContent = `${response.data.main.pressure} hPa`;
        humidity.textContent = `${response.data.main.humidity} %`;
        windSpeed.textContent = `${response.data.wind.speed} m/s`;
        clouds.textContent = `${response.data.clouds.all} %`;
        visibility.textContent = `${response.data.visibility / 1000} km`;
    }).catch((error) => {
        //console.log(error);
        errorMsg.textContent = `${error.response.data.cod} - ${error.response.data.message}.`;
        weatherImg.src = '';
        [cityName, temp, description, feelslike, windSpeed, humidity, pressure, visibility, clouds].forEach(el => el.textContent = '');
    }).finally(() => {
        input.value = '';
    })
}

function getWeatherInfobyEnter (e){
    if(e.key === 'Enter'){
        getWeatherInfo();
    }
}

button.addEventListener('click', getWeatherInfo);
input.addEventListener('keypress', getWeatherInfobyEnter);