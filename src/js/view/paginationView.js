import icons from 'url:../../img/icons.svg';
import view from './view.js';

class paginationView extends view {
  _parentElement = document.querySelector('.pagination');

  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      handler(parseInt(btn.dataset.goto));
    });
  }

  _generateMarkup(data) {
    const currentPage = this._data.current_page;
    const numberOfPages = Math.ceil(
      this._data.result.length / this._data.results_number
    );

    if (currentPage == 1 && currentPage == numberOfPages) return ``;
    if (currentPage == 1 && currentPage != numberOfPages)
      return `
      <button class="btn--inline pagination__btn--next" data-goto='${
        currentPage + 1
      }'>
      <span>Page ${currentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
      </button>
      `;
    if (currentPage < numberOfPages)
      return `
      <button class="btn--inline pagination__btn--prev" data-goto='${
        currentPage - 1
      }'>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currentPage - 1}</span>
      </button>

      <button class="btn--inline pagination__btn--next" data-goto='${
        currentPage + 1
      }'>
      <span>Page ${currentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
    `;
    if (currentPage != 1 && currentPage == numberOfPages)
      return `
    <button class="btn--inline pagination__btn--prev" data-goto='${
      currentPage - 1
    }'>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${currentPage - 1}</span>
    </button>
    `;
  }
}
export default new paginationView();
