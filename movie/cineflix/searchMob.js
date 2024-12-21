 // Capturar el formulario y redirigir a la página de búsqueda con el término ingresado
  const searchForm = document.getElementById('movie-search-form');
  const searchInput = document.getElementById('movie-search-input');

  searchForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar recargar la página
    const query = searchInput.value.trim();
    if (query) {
      // Redirigir a searchMob.html con el término de búsqueda
      window.location.href = `searchMob.html?query=${encodeURIComponent(query)}`;
    }
  });