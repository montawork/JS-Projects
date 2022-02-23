// select elements
const movieSection = document.querySelector('.movie');
const form = document.querySelector('.form');
const input = document.querySelector('.search');

// api url
const url =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI =
  'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  const { results } = data;
  console.log(results);
  const moviesContainer = [];
  for (movie of results) {
    const img = movie.poster_path
      ? IMGPATH + movie.poster_path
      : 'https://c4.wallpaperflare.com/wallpaper/839/927/713/404-fon-error-404-not-found-wallpaper-preview.jpg';
    const div = `
        <div class="movie-container">
            <img src=" ${img}" alt="">
            <div class="info">
            <h3>${movie.original_title}</h3>
            <span style="color:${
              movie.vote_average > 7
                ? '#a5ea54'
                : movie.vote_average < 5
                ? '#ff3b00'
                : '#ff9800'
            }">${movie.vote_average}</span>
            </div>
            <div class="overview">
            <h3>Overview</h3>
            ${movie.overview}
            </div>
        </div>
        
    `;
    moviesContainer.push(div);
  }
  movieSection.innerHTML = moviesContainer.join('');
}

getMovies(url);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputValue = input.value;
  const searchURL = SEARCHAPI + inputValue;
  if (inputValue) {
    getMovies(searchURL);
  }
  input.value = '';
});
