import EmberRouter from '@ember/routing/router';
import config from 'ember-front-end/config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('books');
});

export default Router;
