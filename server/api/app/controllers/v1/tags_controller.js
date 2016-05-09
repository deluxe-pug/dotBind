module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const Tag = Nodal.require('app/models/tag.js');
  const UserTag = Nodal.require('app/models/user_tag.js');
  const CardTag = Nodal.require('app/models/card_tag.js');

  const PromiseMaker = require('bluebird').promisify;
  const findOrCreateTag = PromiseMaker(Tag.findOrCreate, {context: Tag});
  const findOrCreateUserTag = PromiseMaker(UserTag.findOrCreate, {context: UserTag});
  const findOrCreateCardTag = PromiseMaker(CardTag.findOrCreate, {context: CardTag});

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


    /* Sample POST Request
       {
        "card_id": 7,
        "user_id": 7,
        "tags": [
          "React",
          "Backbone"
         ]
        }
    */
    create() {
      const tags = this.params.body.tags;
      const tagPromises = [];
      const cardTagPromises = [];
      const userTagPromises = [];
      const card_id = this.params.body.card_id;
      const user_id = this.params.body.user_id;

      let tag_id;

      tags.forEach((tag) => {
        let name = tag;
        tagPromises.push(findOrCreateTag({name}));
      })

      Promise.all(tagPromises).then((tagModels) => {
        tagModels.forEach((tagModel) => {
          tag_id = tagModel.get('id');
          cardTagPromises.push(findOrCreateCardTag({card_id, tag_id}));
          userTagPromises.push(findOrCreateUserTag({user_id, tag_id}));
        })

        Promise.all(cardTagPromises).then((cardTagModels) => {
          Promise.all(userTagPromises).then((userTagModels) => {
            userTagModels.forEach((user_tag) => {
              if (user_tag.get('card_count') === null) {
                user_tag.set('card_count', 1); // initialize to 1
                user_tag.save();
              } else if (user_tag.get('card_count')) {
                user_tag.set('card_count', user_tag.get('card_count') + 1) // NOTE: does not account for cards that already have tag; Retagging should be prevented client-side
                user_tag.save();
              }
            });
            this.respond(tagModels);
          });
        });

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
