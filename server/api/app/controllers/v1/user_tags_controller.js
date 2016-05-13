module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const UserTag = Nodal.require('app/models/user_tag.js');

  const AuthController = Nodal.require('app/controllers/auth_controller.js');

  class V1UserTagsController extends AuthController {

    index() {

      UserTag.query()
        .where(this.params.query)
        .end((err, models) => {

          this.respond(err || models);

        });

    }

    show() {

      UserTag.find(this.params.route.id, (err, model) => {

        this.respond(err || model);

      });

    }

    create() {

      UserTag.create(this.params.body, (err, model) => {

        this.respond(err || model);

      });

    }

    update() {

      UserTag.update(this.params.route.id, this.params.body, (err, model) => {

        this.respond(err || model);

      });

    }

    destroy() {

      UserTag.destroy(this.params.route.id, (err, model) => {

        this.respond(err || model);

      });

    }

  }

  return V1UserTagsController;

})();
