const API_KEY = '693963709d9537c086d70ed1c546d5da';
let currentPage = 1;
let totalPages = 1;

function mostrarPeliculas() {
  const contenedorPeliculas = document.getElementById('contenedorPeliculas');
  const mensajeContainer = document.getElementById('sec-messages');
  const peliculasFavoritas = JSON.parse(localStorage.getItem('peliculasFavoritas')) || [];

  fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=693963709d9537c086d70ed1c546d5da')
    .then(response => response.json())
    .then(data => {
      const peliculas = data.results;
      contenedorPeliculas.innerHTML = '';

      peliculas.forEach(pelicula => {
        const divPelicula = document.createElement('div');
        const img = document.createElement('img');
        const h3 = document.createElement('h3');
        const pCodigo = document.createElement('p');
        const pTitulo = document.createElement('p');
        const pIdioma = document.createElement('p');
        const pAnio = document.createElement('p');

        img.src = `https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`;
        img.alt = pelicula.title;
        h3.textContent = pelicula.title;
        pCodigo.innerHTML = `<b>Código:</b> ${pelicula.id}`;
        pTitulo.innerHTML = `<b>Título original:</b> ${pelicula.original_title}`;
        pIdioma.innerHTML = `<b>Idioma Original:</b> ${pelicula.original_language}`;
        pAnio.innerHTML = `<b>Año:</b> ${pelicula.release_date}`;

        divPelicula.appendChild(img);
        divPelicula.appendChild(h3);
        divPelicula.appendChild(pCodigo);
        divPelicula.appendChild(pTitulo);
        divPelicula.appendChild(pIdioma);
        divPelicula.appendChild(pAnio);

        contenedorPeliculas.appendChild(divPelicula);

        const button = document.createElement('button');
        button.textContent = 'Agregar a favoritos';

        button.addEventListener('click', () => {
          const peliculaExistente = peliculasFavoritas.find(peliculaFavorita => peliculaFavorita.id === pelicula.id);
          if (peliculaExistente) {
            mostrarMensaje('La película ya fue agregada', 'amarillo');
          } else {
            agregarPeliculaAFavoritos(pelicula);
            mostrarMensaje('Película agregada exitosamente', 'verde');
            mostrarPeliculasFavoritas();

            button.disabled = true;
          }
        });

        divPelicula.appendChild(button);
      });

      const agregarPeliculaForm = document.querySelector('.form-movie-new form');
      const mensaje = document.createElement('div');

      agregarPeliculaForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const codigoPeliculaInput = document.querySelector('.form-movie-new input');
        const codigoPelicula = codigoPeliculaInput.value;

        if (!codigoPelicula || isNaN(codigoPelicula)) {
          mostrarMensaje('El código ingresado es incorrecto', 'rojo');
          return;
        }

        const peliculaExistente = peliculasFavoritas.find(pelicula => pelicula.id === Number(codigoPelicula));

        if (peliculaExistente) {
          mostrarMensaje('La película ya fue agregada', 'amarillo');
          return;
        }

        const pelicula = peliculas.find(pelicula => pelicula.id === Number(codigoPelicula));

        if (pelicula) {
          agregarPeliculaAFavoritos(pelicula);
          mostrarMensaje('Película agregada exitosamente', 'verde');
          mostrarPeliculasFavoritas();
        } else {
          mostrarMensaje('No se encontró una película con el código ingresado', 'rojo');
        }
      });

      function mostrarMensaje(texto, estilo) {
        mensaje.textContent = texto;
        mensaje.classList.add('msg', estilo);
        mensajeContainer.appendChild(mensaje);

        setTimeout(() => {
          mensaje.classList.remove(estilo);
          mensajeContainer.removeChild(mensaje);
        }, 3000);
      }
    })
    .catch(error => {
      console.error('Error al obtener la cartelera de películas:', error);
    });
}

function displayMovies(page) {
  const contenedorPeliculas = document.getElementById('contenedorPeliculas');
  contenedorPeliculas.innerHTML = '';

  fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${page}`)
    .then(response => response.json())
    .then(data => {
      const peliculas = data.results;
      totalPages = data.total_pages;

      peliculas.forEach(pelicula => {
        const divPelicula = document.createElement('div');
        const img = document.createElement('img');
        const h3 = document.createElement('h3');
        const pCodigo = document.createElement('p');
        const pTitulo = document.createElement('p');
        const pIdioma = document.createElement('p');
        const pAnio = document.createElement('p');

        img.src = `https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`;
        img.alt = pelicula.title;
        h3.textContent = pelicula.title;
        pCodigo.innerHTML = `<b>Código:</b> ${pelicula.id}`;
        pTitulo.innerHTML = `<b>Título original:</b> ${pelicula.original_title}`;
        pIdioma.innerHTML = `<b>Idioma Original:</b> ${pelicula.original_language}`;
        pAnio.innerHTML = `<b>Año:</b> ${pelicula.release_date}`;

        divPelicula.appendChild(img);
        divPelicula.appendChild(h3);
        divPelicula.appendChild(pCodigo);
        divPelicula.appendChild(pTitulo);
        divPelicula.appendChild(pIdioma);
        divPelicula.appendChild(pAnio);

        contenedorPeliculas.appendChild(divPelicula);

        const button = document.createElement('button');
        button.textContent = 'Agregar a favoritos';

        button.addEventListener('click', () => {
          // Lógica para agregar a favoritos
        });

        divPelicula.appendChild(button);
      });

      updatePagination();
    })
    .catch(error => {
      console.error('Error al obtener la cartelera de películas:', error);
    });
}

function updatePagination() {
  const paginacionElement = document.getElementById('paginacion');
  paginacionElement.innerHTML = '';

  const btnAnterior = document.createElement('button');
  btnAnterior.className = 'btnPaginacion';
  btnAnterior.textContent = 'Anterior';
  btnAnterior.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      displayMovies(currentPage);
      updatePagination();
    }
  });
  paginacionElement.appendChild(btnAnterior);

  const btnSiguiente = document.createElement('button');
  btnSiguiente.className = 'btnPaginacion';
  btnSiguiente.textContent = 'Siguiente';
  btnSiguiente.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      displayMovies(currentPage);
      updatePagination();
    }
  });
  paginacionElement.appendChild(btnSiguiente);
}

window.onload = function () {
  displayMovies(currentPage);
};
