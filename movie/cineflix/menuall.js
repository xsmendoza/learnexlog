(function() {
  // Variables locales
  const apiKey = '694ca23f12d42b9db18d614d3ffd3496';
  const apiUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + '&language=es-MX&sort_by=popularity.desc&page=1';

  // Mapeo de géneros y sus IDs en TMDB
  const genres = {
    'Acción': 28,
    'Comedia': 35,
    'Thriller': 53,
    'Terror': 27,
    'Aventura': 12,
    'Animación': 16,
    'Crimen': 80,
    'Ciencia Ficción': 878
  };

  // Función para obtener una película aleatoria de un género
  async function fetchRandomMovieByGenre(genreName) {
    try {
      const genreId = genres[genreName];
      if (!genreId) {
        console.error(`Género "${genreName}" no encontrado.`);
        return;
      }

      const response = await fetch(`${apiUrl}&with_genres=${genreId}`);
      const data = await response.json();

      if (data.results.length === 0) {
        console.error(`No se encontraron películas para el género "${genreName}".`);
        return;
      }

      const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
      const posterUrl = randomMovie.poster_path ?
        `https://image.tmdb.org/t/p/w500${randomMovie.poster_path}` :
        'https://via.placeholder.com/500x750?text=No+Image';

      const categoryCard = document.querySelector(`.category-card[data-genre="${genreName}"]`);
      if (categoryCard) {
        categoryCard.querySelector('.card-img').src = posterUrl;
        categoryCard.querySelector('.card-img').alt = randomMovie.title;
        categoryCard.querySelector('.name').textContent = genreName;
        categoryCard.querySelector('.total').textContent = '200'; // Número estimado de películas
      }

      categoryCard.addEventListener('click', () => {
        window.location.href = `${genreName.toLowerCase()}.html`;
      });
    } catch (error) {
      console.error(`Error al obtener la película de ${genreName}:`, error);
    }
  }

  // Llamar a la función para cada género
  Object.keys(genres).forEach(fetchRandomMovieByGenre);
})();