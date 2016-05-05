module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');

  const User = Nodal.require('app/models/user.js');
  const Tag = Nodal.require('app/models/tag.js');

  class UserTag extends Nodal.Model {}

  UserTag.setDatabase(Nodal.require('db/main.js'));
  UserTag.setSchema(Nodal.my.Schema.models.UserTag);

  UserTag.joinsTo(User, {multiple: true});
  UserTag.joinsTo(Tag, {multiple: true});

  return UserTag;

})();
