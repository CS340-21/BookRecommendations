import Mirage, { faker } from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  title: "Title",
  author: "Mayor Bob",
  length: 42,
  mature: "M",
  genre: "Young Adult",
  thumbnail: "http://books.google.com/books/content?id=A5RteM-rsycC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
});
