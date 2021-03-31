import Mirage, { faker } from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  title: "Title",
  author: "Mayor Bob",
  length: 42,
  mature: "M",
  genre: "Young Adult",
  thumbnail: "nudes",

});
