const agregarPeliculaForm = document.getElementById('form-movie-new');
const secMessages = document.getElementById('sec-messages');

agregarPeliculaForm.addEventListener('submit', function (event) {
  event.preventDefault(); 

  const codigoPeliculaInput = document.querySelector('#form-movie-new input');
  const codigoPelicula = codigoPeliculaInput.value;

  if (!isNaN(codigoPelicula)) {
    const peliculasFavoritas = JSON.parse(localStorage.getItem('peliculasFavoritas')) || [];
    const peliculaExistente = peliculasFavoritas.find(pelicula => pelicula.codigo === codigoPelicula);
    if (peliculaExistente) {
      limpiarMensajes();
      mostrarMensaje('La película ya ha sido ingresada', 'error', 'rojo');
      return;
    }

    fetch(`https://api.themoviedb.org/3/movie/${codigoPelicula}?api_key=693963709d9537c086d70ed1c546d5da`)
      .then(response => response.json())
      .then(peliculaData => {
        if (peliculaData.status_code === 34) {
          limpiarMensajes();
          mostrarMensaje('La película no existe en la API', 'error', 'rojo');
          return; 
        }
        const titulo = peliculaData.title;
        const tituloOriginal = peliculaData.original_title;
        const idiomaOriginal = peliculaData.original_language;
        const anio = peliculaData.release_date;
        const resumen = peliculaData.overview;
        const posterPath = peliculaData.poster_path ? peliculaData.poster_path : '';
        const pelicula = {
          codigo: codigoPelicula,
          titulo,
          tituloOriginal,
          idiomaOriginal,
          anio,
          resumen,
          poster_path: posterPath 
        };
        const peliculasFavoritas = JSON.parse(localStorage.getItem('peliculasFavoritas')) || [];
        peliculasFavoritas.push(pelicula);
        localStorage.setItem('peliculasFavoritas', JSON.stringify(peliculasFavoritas));

        console.log('Película agregada a favoritos');
        limpiarMensajes();
        mostrarMensaje('Película agregada a favoritos', 'success', 'verde');

        codigoPeliculaInput.value = '';
      })
      .catch(error => {
        console.error('Error al obtener los detalles de la película:', error);
        mostrarMensaje('Error al obtener los detalles de la película', 'error', 'rojo');
      });
  } else {
    mostrarMensaje('El valor ingresado no es válido', 'error', 'rojo');
  }
});

function mostrarMensaje(mensaje, tipo, color) {
  const mensajeElement = document.createElement('div');
  mensajeElement.textContent = mensaje;
  mensajeElement.classList.add('msg', tipo, color); 
  secMessages.appendChild(mensajeElement);
}

function limpiarMensajes() {
  secMessages.innerHTML = ''; 
}
function agregarPeliculaAFavoritos(pelicula) {
  const peliculasFavoritas = JSON.parse(localStorage.getItem('peliculasFavoritas')) || [];
  const peliculaExistente = peliculasFavoritas.find(p => p.codigo === pelicula.codigo);
  if (peliculaExistente) {
    limpiarMensajes();
    mostrarMensaje('La película ya ha sido ingresada', 'error', 'rojo');
    return;
  }

  peliculasFavoritas.push(pelicula);
  localStorage.setItem('peliculasFavoritas', JSON.stringify(peliculasFavoritas));

  limpiarMensajes();
  mostrarMensaje('Película agregada a favoritos', 'success', 'verde');

  actualizarPeliculasFavoritas();
}
function actualizarPeliculasFavoritas() {
  const contenedorPeliculasFavoritas = document.getElementById('contenedorPeliculasFavoritas');

  const peliculasFavoritas = JSON.parse(localStorage.getItem('peliculasFavoritas')) || [];

  contenedorPeliculasFavoritas.innerHTML = '';
  peliculasFavoritas.forEach(function(pelicula) {
    const htmlPelicula = generarHTMLPeliculaFavorita(pelicula);
    contenedorPeliculasFavoritas.innerHTML += htmlPelicula;
  });
}

actualizarPeliculasFavoritas();