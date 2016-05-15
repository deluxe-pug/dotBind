module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const Message = Nodal.require('app/models/message.js');

  class V1MessagesController extends Nodal.Controller {

    index() {

      Message.query()
        .where(this.params.query)
        .end((err, models) => {

          this.respond(err || models);

        });

    }

    show() {

      Message.find(this.params.route.id, (err, model) => {

        this.respond(err || model);

      });

    }

    create() {

      Message.create(this.params.body, (err, model) => {

        this.respond(err || model);

      });

    }

    update() {

      Message.update(this.params.route.id, this.params.body, (err, model) => {

        this.respond(err || model);

      });

    }

    destroy() {

      Message.destroy(this.params.route.id, (err, model) => {

        this.respond(err || model);

      });

    }

  }

  return V1MessagesController;

})();
