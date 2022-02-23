const main = document.querySelector('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const apikey = '3265874a2c77ae4a04bb96236a642d2f';
const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(location) {
  const res = await fetch(url(location));
  const data = await res.json();

  console.log(data, KtoC(data.main.temp));
  showWeather(data);
}

getWeatherByLocation('london');

function KtoC(k) {
  return ~~(k - 273.15);
}

function showWeather(data) {
  main.innerHTML = '';
  const temp = KtoC(data.main.temp);
  const div = document.createElement('div');
  div.classList.add('weather');
  div.innerHTML = `
        <p>${data.name}</p>
        <h2>${temp}°C</h2>
    `;
  main.appendChild(div);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (search.value) {
    const location = search.value;
    getWeatherByLocation(location);
  }
  search.value = '';
});
