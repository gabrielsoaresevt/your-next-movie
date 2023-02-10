import {
  API_KEY,
  BASE_URL,
  IMG_URL,
  LANGUAGE,
} from './api.js'

window.addEventListener("load", () => {
  const button = document.querySelector('.search-movie-button');
  button.addEventListener('click', getRandomMovie);
  function getRandomMovie() {
    const MOVIE = (Math.round(Math.random() * (1000 - 1) + 1));
    const apiUrl = BASE_URL+MOVIE+API_KEY+LANGUAGE;  
    fetch(apiUrl)
      .then(response => response.json())
      .then(itemMovie => {
        if(itemMovie.success != false) {
          const movie = document.querySelector('.movie');
          document.querySelector('.click-here').style.display = 'none';
          movie.innerHTML = `
          <div class="movie__image">
            <img class="movie__image__img" src="${IMG_URL+itemMovie.poster_path}" alt="Movie Image">
          </div>
          <div class="movie__info">
            <h2 class="movie__info__title">${itemMovie.title != '' ? itemMovie.title : 'Este filme não possui um titulo, por favor reclame com a The Movie Database API haha.'}</h2>
            <p class="movie__info__synopsis">
              ${itemMovie.overview != '' ? itemMovie.overview : 'Este filme não possui uma sinopse, por favor reclame com a The Movie Database API haha.'}
            </p>
          </div>
        `
        } else {
          getRandomMovie();
        }
      })
    .catch(error => {
      console.error(error);
      document.querySelector('.click-here p').innerText = `
        Parece que houve algum erro, tente novamente!
      `;
    });
  }
});