module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  
  const Card = Nodal.require('app/models/card.js');
  const Tag = Nodal.require('app/models/tag.js');

  class CardTag extends Nodal.Model {}

  CardTag.setDatabase(Nodal.require('db/main.js'));
  CardTag.setSchema(Nodal.my.Schema.models.CardTag);
  
  CardTag.joinsTo(Card, {multiple: true});
  CardTag.joinsTo(Tag, {multiple: true});

  return CardTag;

})();
