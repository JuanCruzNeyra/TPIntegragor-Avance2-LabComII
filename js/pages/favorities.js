document.addEventListener('DOMContentLoaded', function() {
  const contenedorPeliculasFavoritas = document.getElementById('contenedorPeliculasFavoritas');
  const peliculasFavoritas = JSON.parse(localStorage.getItem('peliculasFavoritas')) || [];
  console.log(peliculasFavoritas);

  function generarHTMLPeliculaFavorita(pelicula) {
    const baseURL = 'https://image.tmdb.org/t/p/w500/';
    const imagenURL = `${baseURL}${pelicula.poster_path}`;
     return `
      <div>
        <img src="${imagenURL}" alt="${pelicula.titulo}" class="pelicula">
        <h3 class="pelicula">${pelicula.titulo}</h3>
        <p><b>Código:</b> ${pelicula.codigo}</p>
        <p><b>Título original:</b> ${pelicula.tituloOriginal}</p>
        <p><b>Idioma Original:</b> ${pelicula.idiomaOriginal}</p>
        <p><b>Año:</b> ${pelicula.anio}</p>
        <p><b>Resumen:</b> ${pelicula.resumen}</p>
      </div>
    `; 
  }
  peliculasFavoritas.forEach(function(pelicula) {
    const htmlPelicula = generarHTMLPeliculaFavorita(pelicula);
    contenedorPeliculasFavoritas.innerHTML += htmlPelicula;
  });
});
