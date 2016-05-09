module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const CardTag = Nodal.require('app/models/card_tag.js');
  const Snippet = Nodal.require('app/models/snippet.js')

  class Card extends Nodal.Model {}

  Card.setDatabase(Nodal.require('db/main.js'));
  Card.setSchema(Nodal.my.Schema.models.Card);
  
  Card.joinedBy(CardTag, {multiple: true});
  Card.joinedBy(Snippet, {multiple: true});

  return Card;

})();
