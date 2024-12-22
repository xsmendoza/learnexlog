const apiKey = '694ca23f12d42b9db18d614d3ffd3496'; // Tu API de TMDB
const language = 'es-ES'; // Idioma en español
const movieId = new URLSearchParams(window.location.search).get('id'); // Obtener el ID de la película desde la URL

// Elementos HTML donde se mostrarán los datos
const movieBanner = document.getElementById('movie-banner');
const movieTitle = document.getElementById('movie-title');
const movieDescription = document.getElementById('movie-description');
const movieRating = document.getElementById('movie-rating');
const movieYear = document.getElementById('movie-year');
const movieDuration = document.getElementById('movie-duration');
const movieGenres = document.getElementById('movie-genres');
const movieDirector = document.getElementById('movie-director');
const movieCountry = document.getElementById('movie-country');
const movieRelease = document.getElementById('movie-release');
const movieViews = document.getElementById('movie-views');
const movieActors = document.getElementById('movie-actors');
const castList = document.getElementById('cast-list');
const relatedList = document.getElementById('related-list');
const moviePlayer = document.getElementById('movie-player');

// Función para obtener los detalles de la película
function getMovieDetails() {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=${language}&append_to_response=credits,production_companies,similar`)
    .then(response => response.json())
    .then(data => {
      // Mostrar la imagen de la película
      movieBanner.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;

      // Mostrar título
      movieTitle.textContent = data.title;

      // Mostrar descripción
      movieDescription.textContent = data.overview || 'No hay descripción disponible';

      // Mostrar rating
      movieRating.innerHTML = `<span>Calificación:</span> ${data.vote_average} / 10`;

      // Mostrar año de estreno
      movieYear.innerHTML = `<span>Año:</span> ${new Date(data.release_date).getFullYear()}`;

      // Mostrar duración
      movieDuration.innerHTML = `<span>Duración:</span> ${data.runtime} min`;

      // Mostrar géneros
      const genres = data.genres.map(genre => genre.name).join(', ');
      movieGenres.innerHTML = `<span>Género:</span> ${genres}`;

      // Mostrar director
      movieDirector.innerHTML = `<span>Director:</span> ${data.production_companies.map(company => company.name).join(', ')}`;

      // Mostrar país
      movieCountry.innerHTML = `<span>País:</span> ${data.production_countries.map(country => country.name).join(', ')}`;

      // Mostrar fecha de estreno
      movieRelease.innerHTML = `<span>Estreno:</span> ${new Date(data.release_date).toLocaleDateString()}`;

      // Mostrar vistas (esto no está en TMDB, puedes asignarlo a un valor manual o quitarlo)
      movieViews.innerHTML = `<span>Vistas:</span> 700274`;

      // Mostrar actores (Ahora se muestran todos los actores)
      const actors = data.credits.cast.map(actor => actor.name).join(', ');
      movieActors.innerHTML = `<span>Actores:</span> ${actors}`;

      // Mostrar reparto de actores (Aquí se muestran todos los actores con imágenes)
      castList.innerHTML = '';
      data.credits.cast.forEach(actor => {
        const actorCard = document.createElement('div');
        actorCard.classList.add('actor-card');

        // Crear enlace para redirigir al actorMovies.html
        const actorLink = document.createElement('a');
        actorLink.href = `actorMovies.html?id=${actor.id}`;

        actorCard.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/w500${actor.profile_path}" alt="${actor.name}" class="actor">
                    <p>${actor.name}</p>
                `;

        // Añadir evento click al enlace
        actorLink.appendChild(actorCard);
        castList.appendChild(actorLink);
      });

      // Mostrar películas relacionadas
      relatedList.innerHTML = '';
      data.similar.results.slice(0, 3).forEach(movie => {
        const relatedMovieCard = document.createElement('div');
        relatedMovieCard.classList.add('related-movie-card');
        relatedMovieCard.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="related-image">
                    <p>${movie.title}</p>
                `;
        relatedList.appendChild(relatedMovieCard);
      });

      // Insertar el iframe del reproductor de 2embed
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.2embed.cc/embed/${movieId}`;
      iframe.frameborder = "0";
      iframe.width = "100%";
      iframe.height = "500";
      iframe.allowfullscreen = true;
      moviePlayer.appendChild(iframe);
    })
    .catch(error => console.error('Error al cargar los detalles de la película:', error));
}

// Llamar la función para obtener los detalles de la película
getMovieDetails();











document.addEventListener('DOMContentLoaded', function() {
  const apiKey = '694ca23f12d42b9db18d614d3ffd3496'; // Tu API de TMDB
  const language = 'es-ES'; // Idioma en español

  // Obtener el contenedor de la película
  const bannerImg = document.getElementById('banner-img');
  const movieGenre = document.getElementById('movie-genre').querySelector('span');
  const movieYear = document.getElementById('movie-year').querySelector('span');
  const movieDuration = document.getElementById('movie-duration').querySelector('span');
  const movieQuality = document.getElementById('movie-quality');
  const movieTitle = document.getElementById('movie-title');
  const movieLink = document.getElementById('movie-link');

  // Obtener la película más reciente
  fetch(`https://api.themoviedb.org/3/movie/latest?api_key=${apiKey}&language=${language}`)
    .then(response => response.json())
    .then(movie => {
      // Actualizar la imagen de la película
      bannerImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

      // Actualizar el título de la película
      movieTitle.textContent = movie.title;

      // Actualizar el género
      const genre = movie.genres.map(genre => genre.name).join('/');
      movieGenre.textContent = genre;

      // Actualizar el año
      movieYear.textContent = new Date(movie.release_date).getFullYear();

      // Actualizar la duración (en minutos)
      movieDuration.textContent = `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`;

      // Actualizar la calidad (puedes personalizarla según lo que necesites)
      movieQuality.textContent = '4K'; // Aquí puedes hacer una lógica para determinar la calidad según la fuente

      // Al hacer clic en la imagen o en cualquier parte, redirigir a movie.html
      movieLink.addEventListener('click', function() {
        // Guardar el ID de la película seleccionada en el localStorage
        localStorage.setItem('movieId', movie.id);
      });
    })
    .catch(error => console.error('Error al obtener la película más reciente:', error));
});