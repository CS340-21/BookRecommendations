import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  author: DS.attr('string'),
  length: DS.attr('number'),
  mature: DS.attr('string'),
  genre: DS.attr('string'),
  thumbnail: DS.attr('string'),
});
