import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  // router: service(),
  async getBooks() {
    const books = await this.store.findAll('book');
    this.set('books', books)
    return books;
  },

  async model() {
    document.title = 'Books';
    const books = await this.getBooks();
    return books;
    // const books = this.store.findAll('book');
    // this.set('books', books)
    // debugger;
  },

});
