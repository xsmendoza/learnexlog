document.getElementById('search-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const searchQuery = document.getElementById('search-input').value.trim();
  if (searchQuery) {
    // Redirigir a search.html con la búsqueda en la URL
    window.location.href = `search.html?query=${encodeURIComponent(searchQuery)}`;
  }
});