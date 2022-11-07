import icons from 'url:../../img/icons.svg';
import view from './view.js';

class searchView extends view {
  _parentElement = document.querySelector('.search');
  _query;

  getQueries() {
    this._query = this._parentElement.querySelector('.search__field').value;
    this._clearInput();
    return this._query;
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', event => {
      event.preventDefault();
      handler();
    });
  }
}
export default new searchView();
