export const messageError = (message, tag) => {
  const spanError = document.createElement('span');
  spanError.textContent = message;
  spanError.classList.add('messageError,messageErrorEmail');
  tag.insertAdjacentElement('afterend', spanError);
};
