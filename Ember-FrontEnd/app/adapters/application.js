import DS from 'ember-data';
import ENV from 'ember-front-end/config/environment';

export default DS.RESTAdapter.extend({
    host: ENV.webServiceURL
}); 
