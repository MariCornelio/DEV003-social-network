import { guardarPublicacion, verPublicacion } from './model/firebase';

const contenedorPublicacion = document.querySelector('.contenedorPublicacion');
contenedorPublicacion.addEventListener('submit', (e) => {
  e.preventDefault();
  const description = document.querySelector('.contenedorPublicacion .description');

  guardarPublicacion(description.value);
  contenedorPublicacion.reset();
});

const muestraPublicaciones = document.querySelector('.muestra-publicaciones');
verPublicacion((querySnapshot) => {
  let html = '';
  querySnapshot.forEach((doc) => {
    html += `
    <h3>Fernanda Anita</h3>
    <p>${doc.data().descripcion}</p>
    `;
  });
  muestraPublicaciones.innerHTML = html;
});
