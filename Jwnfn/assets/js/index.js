const apiKey = '694ca23f12d42b9db18d614d3ffd3496'; // Tu API de TMDB
const language = 'es-ES'; // Idioma en español
let page = 1; // Empezamos desde la primera página de resultados

const moviesGrid = document.getElementById('movies-grid');
const loadMoreButton = document.getElementById('load-more');
let genreList = []; // Aquí guardaremos los géneros

// Función para obtener los géneros
function getGenres() {
  fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=${language}`)
    .then(response => response.json())
    .then(data => {
      genreList = data.genres; // Guardamos los géneros
      getMovies(); // Después de cargar los géneros, obtenemos las películas
    })
    .catch(error => console.error('Error al cargar los géneros:', error));
}

// Función para obtener las películas
function getMovies() {
  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=${language}&page=${page}`)
    .then(response => response.json())
    .then(data => {
      const movies = data.results;

      // Mostrar las películas
      movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        // Obtener el nombre de los géneros
        const movieGenres = movie.genre_ids.map(id => {
          const genre = genreList.find(g => g.id === id);
          return genre ? genre.name : 'Desconocido';
        }).join(', '); // Unimos los géneros

        // Contenido de la tarjeta
        movieCard.innerHTML = `
                    <div class="card-head">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="card-img">
                        <div class="card-overlay">
                            <div class="bookmark">
                                <ion-icon name="bookmark-outline"></ion-icon>
                            </div>
                            <div class="rating">
                                <ion-icon name="star-outline"></ion-icon> <span>${movie.vote_average}</span>
                            </div>
                            <div class="play">
                                <ion-icon name="play-circle-outline"></ion-icon>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <h3 class="card-title">${movie.title}</h3>
                        <div class="card-info">
                            <span class="genre">${movieGenres}</span> 
                            <span class="year">${new Date(movie.release_date).getFullYear()}</span>
                        </div>
                    </div>
                `;

        // Agregar la tarjeta al contenedor
        moviesGrid.appendChild(movieCard);

        // Redirigir al hacer clic en el título de la película
        movieCard.querySelector('.card-title').addEventListener('click', () => {
          window.location.href = `movie.html?id=${movie.id}`;
        });

        // Redirigir al hacer clic en el ícono de play
        movieCard.querySelector('.play').addEventListener('click', () => {
          window.location.href = `movie.html?id=${movie.id}`;
        });
      });

      // Incrementar el número de página para la próxima carga
      page++;
    })
    .catch(error => console.error('Error al cargar las películas:', error));
}

// Cargar más películas cuando se haga clic en el botón
loadMoreButton.addEventListener('click', getMovies);

// Cargar los géneros antes de las películas
getGenres();