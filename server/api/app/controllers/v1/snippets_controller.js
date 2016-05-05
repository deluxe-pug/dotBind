module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const Snippet = Nodal.require('app/models/snippet.js');

  class V1SnippetsController extends Nodal.Controller {

    index() {

      Snippet.query()
        .where(this.params.query)
        .end((err, models) => {

          this.respond(err || models);

        });

    }

    show() {

      Snippet.find(this.params.route.id, (err, model) => {

        this.respond(err || model);

      });

    }

    create() {

      Snippet.create(this.params.body, (err, model) => {

        this.respond(err || model);

      });

    }

    update() {

      Snippet.update(this.params.route.id, this.params.body, (err, model) => {

        this.respond(err || model);

      });

    }

    destroy() {

      Snippet.destroy(this.params.route.id, (err, model) => {

        this.respond(err || model);

      });

    }

  }

  return V1SnippetsController;

})();
