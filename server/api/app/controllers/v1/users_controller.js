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

          this.respond(err || users, ['username', {userTags: [{tag: ['name']}, 'card_count']}] );

        });

    }

    show() {

      User.find(this.params.route.id, (err, model) => {

        this.respond(err || model);

      });

    }

    create() {

      User.create(this.params.body, (err, model) => {

        this.respond(err || model);

      });

    }

    update() {

      User.update(this.params.route.id, this.params.body, (err, model) => {

        this.respond(err || model);

      });

    }

    destroy() {

      User.destroy(this.params.route.id, (err, model) => {

        this.respond(err || model);

      });

    }

  }

  return V1UsersController;

})();
