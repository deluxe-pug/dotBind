module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');

  const UserTag = Nodal.require('app/models/user_tag.js');

  class User extends Nodal.Model {}

  User.setDatabase(Nodal.require('db/main.js'));
  User.setSchema(Nodal.my.Schema.models.User);

  User.joinedBy(UserTag, {multiple: true});

  return User;

})();
