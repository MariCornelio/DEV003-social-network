//crea el mensaje de error
export const messageError = (message, tag) => {
  const divError = document.createElement('div');
  divError.innerHTML = ` <i class="fa-solid fa-circle-exclamation"></i> <p>${message}</p>`;
  divError.classList.add('messageError');
  tag.insertAdjacentElement('afterend', divError);
//crea un div hermano de la etiqueta 'tag'
};

//limpia mensajes de error
export const cleanMessageErrors = (tagContainer) => {
  if (tagContainer.querySelector('.messageError') !== null) {
    tagContainer.removeChild(document.querySelector('.messageError'));
  }
};
