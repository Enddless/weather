const weatherTranslations = {
  sunny: 'Солнечно',
  'partly cloudy': 'Частично облачно',
  cloudy: 'Облачно',
  overcast: 'Облачно',
  mist: 'Мгла',
  'patchy rain possible': 'Возможен местами дождь',
  'patchy snow possible': 'Возможен местами снег',
  'patchy sleet possible': 'Возможен местами дождь со снегом',
  'patchy freezing drizzle possible':
    'Возможна местами морось при заморозках',
  'thundery outbreaks possible': 'Возможны грозы',
  'blowing snow': 'Снегопад',
  blizzard: 'Метель',
  fog: 'Туман',
  'freezing fog': 'Заморозки в тумане',
  'patchy light drizzle': 'Местами легкая морось',
  'light drizzle': 'Легкая морось',
  'freezing drizzle': 'Морось при заморозках',
  'heavy freezing drizzle': 'Сильная морось при заморозках',
  'patchy light rain': 'Местами легкий дождь',
  'light rain': 'Легкий дождь',
  'moderate rain at times': 'Умеренный дождь местами',
  'moderate rain': 'Умеренный дождь',
  'heavy rain at times': 'Сильный дождь местами',
  'heavy rain': 'Сильный дождь',
  'light freezing rain': 'Легкий дождь при заморозках',
  'moderate or heavy freezing rain':
    'Умеренный или сильный дождь при заморозках',
  'light sleet': 'Легкий дождь со снегом',
  'moderate or heavy sleet': 'Умеренный или сильный дождь со снегом',
  'patchy light snow': 'Местами легкий снег',
  'light snow': 'Легкий снег',
  'patchy moderate snow': 'Местами умеренный снег',
  'moderate snow': 'Умеренный снег',
  'patchy heavy snow': 'Местами сильный снег',
  'heavy snow': 'Сильный снег',
  'ice pellets': 'Ледяные гранулы',
  'light rain shower': 'Легкий дождь',
  'moderate or heavy rain shower': 'Умеренный или сильный дождь',
  'torrential rain shower': 'Ливневый дождь',
  'light sleet showers': 'Легкие дожди со снегом',
  'moderate or heavy sleet showers':
    'Умеренные или сильные дожди со снегом',
  'light snow showers': 'Легкие снегопады',
  'moderate or heavy snow showers': 'Умеренные или сильные снегопады',
  'light showers of ice pellets': 'Легкие дожди ледяных гранул',
  'moderate or heavy showers of ice pellets':
    'Умеренные или сильные дожди ледяных гранул',
  'patchy light rain with thunder': 'Местами легкий дождь с грозой',
  'moderate or heavy rain with thunder':
    'Умеренный или сильный дождь с грозой',
  'patchy light snow with thunder': 'Местами легкий снег с грозой',
  'moderate or heavy snow with thunder':
    'Умеренный или сильный снег с грозой'
};

document
  .getElementById('getWeather')
  .addEventListener('click', async () => {
    const city = document.getElementById('city').value;
    const API_KEY = '56e9055f41c84c96b6574000242310';
    const API_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(
      city
    )}`;

    console.log(API_URL);
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error('Ошибка при получении данных о погоде');
      }

      const data = await response.json();
      const conditionText =
        weatherTranslations[
          data.current.condition.text.toLowerCase()
        ] || data.current.condition.text;

      const weatherResult = document.getElementById('weatherResult');
      weatherResult.innerHTML = `
          <img src="https:${data.current.condition.icon}" alt="${data.current.condition.text}" />
          <h2>Текущая погода: ${data.current.temp_c} °C, ${conditionText}</h2>
      `;
      document.getElementById('errorMessage').innerText = '';
    } catch (error) {
      document.getElementById('errorMessage').innerText =
        error.message;
      document.getElementById('weatherResult').innerHTML = '';
    }
  });

const cityInput = document.getElementById('city');
cityInput.addEventListener('input', (event) => {
  event.target.value = event.target.value.replace(/<[^>]*>/g, '');
});
