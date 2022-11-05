import icons from 'url:../../img/icons.svg';
import view from './view.js';

class resultView extends view {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again ;)';
  _successMessage = '';

  _generateMarkup(data) {
    return data.map(result => {
      return `
      <li class="preview">
      <a class="preview__link" href="#${result.id}">
        <figure class="preview__fig">
          <img src="${result.image}" alt="${result.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${result.title} ...</h4>
          <p class="preview__publisher">${result.publisher}</p>
        </div>
      </a>
    </li>
      `;
    });
  }
}
export default new resultView();
