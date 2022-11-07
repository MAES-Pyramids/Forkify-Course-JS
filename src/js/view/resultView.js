import icons from 'url:../../img/icons.svg';
import markupPreviewView from './markupPreviewView';
import view from './view.js';

class resultView extends view {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again ;)';
  _successMessage = '';

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return this._data
      .map(result => markupPreviewView.render(result, false))
      .join('');
  }
}
export default new resultView();
