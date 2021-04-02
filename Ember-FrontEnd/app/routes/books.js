import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.findAll('book');
  },
    
  actions: {
    didTransition() {
      document.title = 'Books';
    },
  }
});