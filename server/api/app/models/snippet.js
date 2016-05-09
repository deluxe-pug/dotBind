module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const Card = Nodal.require('app/models/card.js');

  class Snippet extends Nodal.Model {}

  Snippet.setDatabase(Nodal.require('db/main.js'));
  Snippet.setSchema(Nodal.my.Schema.models.Snippet);

  Snippet.joinsTo(Card, {multiple: true});

  return Snippet;

})();
