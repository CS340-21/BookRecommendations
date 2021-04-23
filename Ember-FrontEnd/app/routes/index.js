import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  store: service(),
  async model() {
    document.title = 'Books';
    let books = await this.store.query('book', {
      inauthor: 'Sanderson',
      subject: 'fiction',
    });
    books = books.map((book) => book.toJSON({ includeId: true }));
    this.set('books', books);
    return books;
  },
});
