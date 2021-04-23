import Model, { attr } from '@ember-data/model'

export default Model.extend({
  title: attr('string'),
  author: attr('string'),
  pageCount: attr('number'),
  maturityRating: attr('string'),
  genre: attr('string'),
  thumbnail: attr('string'),
});
