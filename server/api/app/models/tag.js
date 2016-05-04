module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const CardTag = Nodal.require('app/models/card_tag.js');

  class Tag extends Nodal.Model {}

  Tag.setDatabase(Nodal.require('db/main.js'));
  Tag.setSchema(Nodal.my.Schema.models.Tag);

  Tag.joinedBy(CardTag, {multiple: true});
  
  return Tag;

})();
