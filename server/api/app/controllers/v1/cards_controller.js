module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const Card = Nodal.require('app/models/card.js');

  class V1CardsController extends Nodal.Controller {

    index() {

      Card.query()
        .where(this.params.query)
        .end((err, models) => {

          this.respond(err || models);

        });

    }

    show() {

      Card.find(this.params.route.id, (err, model) => {

        this.respond(err || model);

      });

    }

    create() {

      Card.create(this.params.body, (err, model) => {

        this.respond(err || model);

      });

    }

    update() {

      Card.update(this.params.route.id, this.params.body, (err, model) => {

        this.respond(err || model);

      });

    }

    destroy() {

      Card.destroy(this.params.route.id, (err, model) => {

        this.respond(err || model);

      });

    }

  }

  return V1CardsController;

})();
