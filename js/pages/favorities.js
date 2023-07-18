document.addEventListener('DOMContentLoaded', mostrarPeliculasFavoritas);

function mostrarPeliculasFavoritas() {
  const peliculasFavoritas = JSON.parse(localStorage.getItem('peliculasFavoritas')) || [];
  const contenedorFavoritos = document.getElementById('contenedorPeliculasFavoritas');

  contenedorFavoritos.innerHTML = '';

  peliculasFavoritas.forEach(pelicula => {
    const divPelicula = document.createElement('div');
    const img = document.createElement('img');
    const h3 = document.createElement('h3');
    const pCodigo = document.createElement('p');
    const pTitulo = document.createElement('p');
    const pIdioma = document.createElement('p');
    const pAnio = document.createElement('p');
    const pResumen = document.createElement('p');
    const btnQuitar = document.createElement('button');

    img.src = `https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`;
    img.alt = pelicula.title;
    h3.textContent = pelicula.title;
    pCodigo.innerHTML = `<b>Código:</b> ${pelicula.id}`;
    pTitulo.innerHTML = `<b>Título original:</b> ${pelicula.original_title}`;
    pIdioma.innerHTML = `<b>Idioma Original:</b> ${pelicula.original_language}`;
    pAnio.innerHTML = `<b>Año:</b> ${pelicula.release_date}`;
    pResumen.innerHTML = `<b>Resumen:</b> ${pelicula.overview}`;
    btnQuitar.dataset.id = pelicula.id;
    btnQuitar.textContent = 'Quitar';
    btnQuitar.addEventListener('click', () => quitarPeliculaFavorita(pelicula.id));

    divPelicula.appendChild(img);
    divPelicula.appendChild(h3);
    divPelicula.appendChild(pCodigo);
    divPelicula.appendChild(pTitulo);
    divPelicula.appendChild(pIdioma);
    divPelicula.appendChild(pAnio);
    divPelicula.appendChild(pResumen);
    divPelicula.appendChild(btnQuitar);

    contenedorFavoritos.appendChild(divPelicula);
  });
}

function quitarPeliculaFavorita(id) {
  let peliculasFavoritas = JSON.parse(localStorage.getItem('peliculasFavoritas')) || [];

  peliculasFavoritas = peliculasFavoritas.filter(pelicula => pelicula.id !== id);

  localStorage.setItem('peliculasFavoritas', JSON.stringify(peliculasFavoritas));

  mostrarPeliculasFavoritas(); 
}
