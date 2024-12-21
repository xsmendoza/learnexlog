// API Key de TMDB
const apiKey = '694ca23f12d42b9db18d614d3ffd3496';
const apiUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + '&language=es-MX&sort_by=popularity.desc&page=';
let currentPage = 1; // Variable para el control de la página

// Obtenemos el contenedor donde se mostrarán las películas
const moviesGrid = document.getElementById('movies-grid');
const loadMoreButton = document.querySelector('.load-more');

// Función para obtener los géneros de TMDB
async function fetchGenres() {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=es-MX`);
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error('Error al obtener los géneros:', error);
    return [];
  }
}

// Función para obtener las películas desde la API
async function fetchMovies(page) {
  try {
    const genres = await fetchGenres(); // Obtener los géneros
    const response = await fetch(apiUrl + page); // Llamar a la API con el número de página
    const data = await response.json();

    // Verificamos si hay más películas para cargar
    if (data.results.length === 0) {
      loadMoreButton.style.display = 'none'; // Ocultamos el botón si no hay más películas
      return;
    }

    // Iteramos sobre las películas y las agregamos al DOM
    data.results.forEach(movie => {
      // Si no hay imagen, usar una imagen de reserva
      const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image';
      const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'Desconocido';

      // Obtener los nombres de los géneros a partir de los ID de géneros
      const movieGenres = movie.genre_ids.map(genreId => {
        const genre = genres.find(g => g.id === genreId);
        return genre ? genre.name : 'Desconocido';
      }).join(', '); // Unir los géneros en un solo string

      // Crear una tarjeta de película
      const movieCard = document.createElement('div');
      movieCard.classList.add('movie-card');

      // Crear el contenido HTML de la tarjeta
      movieCard.innerHTML = `
        <div class="card-head">
          <img src="${posterUrl}" alt="${movie.title}" class="card-img">
          <div class="card-overlay">
            <div class="bookmark">
              <ion-icon name="bookmark-outline"></ion-icon>
            </div>
            <div class="rating">
              <ion-icon name="star-outline"></ion-icon>
              <span>${movie.vote_average}</span>
            </div>
            <div class="play" onclick="window.location.href='movies.html?id=${movie.id}'">
              <ion-icon name="play-circle-outline"></ion-icon>
            </div>
          </div>
        </div>

        <div class="card-body">
          <h3 class="card-title" onclick="window.location.href='movies.html?id=${movie.id}'">${movie.title}</h3>
          <div class="card-info">
            <span class="genre">${movieGenres}</span>
            <span class="year">${releaseYear}</span>
          </div>
        </div>
      `;

      // Agregar la tarjeta al contenedor
      moviesGrid.appendChild(movieCard);
    });

    // Incrementamos el número de página para la siguiente carga
    currentPage++;
  } catch (error) {
    console.error('Error al obtener las películas:', error);
  }
}

// Evento para cargar más películas al hacer clic en el botón
loadMoreButton.addEventListener('click', () => {
  fetchMovies(currentPage);
});

// Cargar las primeras películas al cargar la página
fetchMovies(currentPage);