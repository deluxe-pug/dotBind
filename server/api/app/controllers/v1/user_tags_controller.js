module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const UserTag = Nodal.require('app/models/user_tag.js');
  const Tag = Nodal.require('app/models/tag.js');
  const PromiseMaker = require('bluebird').promisify;

  const findTag = PromiseMaker(Tag.find, {context: Tag});
  const AuthController = Nodal.require('app/controllers/auth_controller.js');

  class V1UserTagsController extends AuthController {

    index() {

      this.authorize((err, accessToken, user) => {
        const user_id = user.get('id');
        const tagPromises = [];

        UserTag.query()
          .where({user_id})
          .where(this.params.query)
          .end((err, userTags) => {

            // iterate through all userTags
            userTags.forEach((userTag) => {
              let tag_id = userTag.get('tag_id');
              tagPromises.push(findTag(tag_id))
            })

            Promise.all(tagPromises)
              .then((tags) => {

                // convert tags into an object with tag ids as keys
                tags = tags.reduce((accum, tag) => {
                  accum[tag._data.id] = tag._data; // refactor if possible to not use private variables
                  return accum;
                }, {})

                // map through userTags
                userTags = userTags.map((userTag) => {
                  let id = userTag.get('id');
                  let card_count = userTag.get('card_count');
                  let tag_id = userTag.get('tag_id');
                  let tagName = tags[tag_id]['name'];
                  return Object.assign({}, {id, user_id, tag_id, card_count}, {tagName}); 
                })
                // sorts user_tags by card count descending order
                this.respond(userTags.filter((userTag) => {return userTag.card_count !== 0}).sort((tagA, tagB) => {return tagA.card_count < tagB.card_count}));

              })
              .catch((error) => {
                console.error('Error with tagPromises: ', error);
                this.respond(error);
              });

          });
      })


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
