
function agregarPeliculaAFavoritos(pelicula) {
    const peliculasFavoritas = JSON.parse(localStorage.getItem('peliculasFavoritas')) || [];
    const peliculaExistente = peliculasFavoritas.find(p => p.codigo === pelicula.id);
    if (peliculaExistente) {
      console.log('La película ya está en favoritos');
      return;
    }
  
    peliculasFavoritas.push(pelicula);
    localStorage.setItem('peliculasFavoritas', JSON.stringify(peliculasFavoritas));
  
    console.log('Película agregada a favoritos');
  
  }

