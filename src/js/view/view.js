import icons from 'url:../../img/icons.svg';

export default class view {
  _data;

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup(this._data);

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  render(data) {
    if (!data || (Array.isArray(data) && data.length == 0))
      return this.renderErrorMessage();
    this._data = data;
    const Markups = this._generateMarkup(this._data);
    this._clear();
    this._parentElement.insertAdjacentHTML('afterBegin', Markups);
  }

  renderSpinner() {
    const spinnerMarkup = this.#generateSpinnerMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterBegin', spinnerMarkup);
  }

  renderErrorMessage(message = this._errorMessage) {
    const markup = `
    <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
          `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterBegin', markup);
  }
  renderSuccessMessage(message = this._successMessage) {
    const markup = `
    div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterBegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  #generateSpinnerMarkup() {
    return `
    <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>
`;
  }
}
