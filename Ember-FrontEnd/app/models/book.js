import Model, { attr } from '@ember-data/model'

export default Model.extend({
  title: attr('string'),
  author: attr('string'),
  length: attr('number'),
  mature: attr('string'),
  genre: attr('string'),
  thumbnail: attr('string'),
});
