module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');

  class Card extends Nodal.Model {}

  Card.setDatabase(Nodal.require('db/main.js'));
  Card.setSchema(Nodal.my.Schema.models.Card);

  return Card;

})();
