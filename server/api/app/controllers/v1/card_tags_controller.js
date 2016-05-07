module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const CardTag = Nodal.require('app/models/card_tag.js');

  class V1CardTagsController extends Nodal.Controller {

    index() {

      CardTag.query()
        .join('card')
        .where(this.params.query)
        .end((err, models) => {
          console.log('this is cardtag query --------> :', this.params);
          this.respond(err || models, ['id', 'card_id', {card: ['id', 'url']}, {tag: ['id']} ]);
        });

    }

    show() {

      CardTag.find(this.params.route.id, (err, model) => {

        this.respond(err || model);

      });

    }

    create() {

      CardTag.create(this.params.body, (err, model) => {

        this.respond(err || model);

      });

    }

    update() {

      CardTag.update(this.params.route.id, this.params.body, (err, model) => {

        this.respond(err || model);

      });

    }

    destroy() {

      CardTag.destroy(this.params.route.id, (err, model) => {

        this.respond(err || model);

      });

    }

  }

  return V1CardTagsController;

})();
