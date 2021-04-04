import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  store: service(),

  async model() {
    document.title = 'Books';
    const books = this.store.findAll('book');
    this.set('books', books);
    return books;
  },

});
