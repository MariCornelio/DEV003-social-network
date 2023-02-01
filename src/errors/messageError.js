export const messageError = (message, tag) => {
  const spanError = document.createElement('span');
  spanError.textContent = message;
  spanError.classList.add('messageError', 'messageErrorEmail');
  tag.insertAdjacentElement('afterend', spanError);
};
export const cleanMessageErrors = (tagContainer) => {
  if (document.querySelector('.messageError') !== null) {
    tagContainer.removeChild(document.querySelector('.messageError'));
  }
};
