import icons from 'url:../../img/icons.svg';
import view from './view.js';

class paginationView extends view {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup(data) {
    const currentPage = this._data.current_page;
    const numberOfPages = Math.ceil(
      this._data.result.length / this._data.results_number
    );
    console.log(`currentPage:   ${currentPage}`);
    console.log(`numberOfPages: ${numberOfPages}`);

    if (currentPage == 1 && currentPage == numberOfPages)
      return 'first page and no other';
    if (currentPage == 1 && currentPage != numberOfPages)
      return 'first page and there is';
    if (currentPage < numberOfPages) return 'in the middle';
    if (currentPage != 1 && currentPage == numberOfPages) return 'last page';
  }
}
export default new paginationView();
