module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const Card = Nodal.require('app/models/card.js');
  const User = Nodal.require('app/models/user.js');

  class Message extends Nodal.Model {}

  Message.setDatabase(Nodal.require('db/main.js'));
  Message.setSchema(Nodal.my.Schema.models.Message);

  Message.joinsTo(Card, {multiple: true});
  Message.joinsTo(User, {multiple: true});

  return Message;

})();
