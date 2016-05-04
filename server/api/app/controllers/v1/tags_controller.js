module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const Tag = Nodal.require('app/models/tag.js');

  class V1TagsController extends Nodal.Controller {

    index() {

      Tag.query()
        .where(this.params.query)
        .end((err, models) => {

          this.respond(err || models);

        });

    }

    show() {

      Tag.find(this.params.route.id, (err, model) => {

        this.respond(err || model);

      });

    }

    create() {

      Tag.create(this.params.body, (err, model) => {

        this.respond(err || model);

      });

    }

    update() {

      Tag.update(this.params.route.id, this.params.body, (err, model) => {

        this.respond(err || model);

      });

    }

    destroy() {

      Tag.destroy(this.params.route.id, (err, model) => {

        this.respond(err || model);

      });

    }

  }

  return V1TagsController;

})();
