import markupPreviewView from './markupPreviewView';
import view from './view.js';

class bookMarkView extends view {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return this._data
      .map(bookmark => markupPreviewView.render(bookmark, false))
      .join('');
  }
}
export default new bookMarkView();
