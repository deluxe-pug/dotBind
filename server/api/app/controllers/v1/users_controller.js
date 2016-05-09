module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const User = Nodal.require('app/models/user.js');

  class V1UsersController extends Nodal.Controller {

    index() {

      User.query()
        .join('userTags__tag')
        .where(this.params.query)
        .end((err, users) => {

          this.respond(err || users, ['id', 'username', 'email', 'created_at', {userTags: [{tag: ['name']}, 'card_count']}] );

        });

    }

    show() {

      User.find(this.params.route.id, (err, user) => {

        this.respond(err || user, ['id', 'username', 'email', 'created_at']);

      });

    }

    create() {

      User.create(this.params.body, (err, user) => {

        this.respond(err || user, ['id', 'username', 'email', 'created_at']);

      });

    }

    update() {

      User.update(this.params.route.id, this.params.body, (err, user) => {

        this.respond(err || user, ['id', 'username', 'email', 'created_at']);

      });

    }

    destroy() {

      User.destroy(this.params.route.id, (err, user) => {

        this.respond(err || user, ['id', 'username', 'email', 'created_at']);

      });

    }

  }

  return V1UsersController;

})();
