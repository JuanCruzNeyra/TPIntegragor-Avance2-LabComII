
const contenedorPeliculas = document.getElementById('contenedorPeliculas');

// Se solicita a la API para obtener las peliculas
fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=693963709d9537c086d70ed1c546d5da')
  .then(response => response.json())
  .then(data => {
    // arreglo de peliculas
    const peliculas = data.results;

    // Recorre el arreglo y crea la descripcion de la pelicula
    peliculas.forEach(pelicula => {
      
      const divPelicula = document.createElement('div');
      const img = document.createElement('img');
      const h3 = document.createElement('h3');
      const pCodigo = document.createElement('p');
      const pTitulo = document.createElement('p');
      const pIdioma = document.createElement('p');
      const pAnio = document.createElement('p');
      const button = document.createElement('button');

      img.src = `https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`;
      img.alt = pelicula.title;
      h3.textContent = pelicula.title;
      pCodigo.innerHTML = `<b>Código:</b> ${pelicula.id}`;
      pTitulo.innerHTML = `<b>Título original:</b> ${pelicula.original_title}`;
      pIdioma.innerHTML = `<b>Idioma Original:</b> ${pelicula.original_language}`;
      pAnio.innerHTML = `<b>Año:</b> ${pelicula.release_date}`;
      button.textContent = 'Agregar a favoritos';

      divPelicula.appendChild(img);
      divPelicula.appendChild(h3);
      divPelicula.appendChild(pCodigo);
      divPelicula.appendChild(pTitulo);
      divPelicula.appendChild(pIdioma);
      divPelicula.appendChild(pAnio);
      divPelicula.appendChild(button);

      // Agregamos las peliculas al contenedor principal
      contenedorPeliculas.appendChild(divPelicula);
      button.addEventListener('click', () => agregarPeliculaAFavoritos(pelicula));
    });
  })
  .catch(error => {
    console.error('Error al obtener la cartelera de películas:', error);
  });
