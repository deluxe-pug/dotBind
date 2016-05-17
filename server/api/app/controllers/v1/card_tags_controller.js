module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const CardTag = Nodal.require('app/models/card_tag.js');
  const UserTag = Nodal.require('app/models/user_tag.js');

  const AuthController = Nodal.require('app/controllers/auth_controller.js'); 

  class V1CardTagsController extends AuthController {

    index() {

      CardTag.query()
        .join('card')
        .join('tag')
        .where(this.params.query)
        .end((err, models) => {
          console.log('this is cardtag query --------> :', this.params);
          this.respond(err || models, ['id', {card: ['id', 'url']}, {tag: ['id']} ]);
        });

    }

    show() {

      CardTag.find(this.params.route.id, (err, model) => {

        this.respond(err || model);

      });

    }

    create() {
      this.authorize((err, accessToken, user) => {
        if (err) {
          return this.respond(err);
        }
        const user_id = user.get('id');
        CardTag.create(this.params.body, (error, cardTag) => {
          const tag_id = cardTag.get('tag_id');

           UserTag.query()
           .where({user_id, tag_id})
           .end((err, userTags) => {
             if (err) {
               return this.respond(err);
             }

             // Decrement the card_count for the userTag
             const userTag = userTags[0]
             let card_count = userTag.get('card_count');
             console.log('card_count before incrementing ***********>', userTag.get('card_count'))
             userTag.set('card_count', userTag.get('card_count') + 1);
             console.log('card_count after incrementing**************>: ', userTag.get('card_count'));
             userTag.save();
           
             this.respond(error || cardTag);
           })


        });
        
      })

    }

    update() {

      CardTag.update(this.params.route.id, this.params.body, (err, model) => {

        this.respond(err || model);

      });

    }

    destroy() {
      this.authorize((err, accessToken, user) => {
        if (err) {
          return this.respond(err);
        }
        const user_id = user.get('id');

        CardTag.destroy(this.params.route.id, (error, cardTag) => {
          console.log('This is the user_id ------>', user_id);
          console.log('This is the cardTag ------>', cardTag);
          const tag_id = cardTag.get('tag_id');
          UserTag.query()
          .where({user_id, tag_id})
          .end((err, userTags) => {
            if (err) {
              return this.respond(err);
            }

            // Decrement the card_count for the userTag
            const userTag = userTags[0]
            let card_count = userTag.get('card_count');
            userTag.set('card_count', --card_count);
            userTag.save();
        
            this.respond(error || cardTag);
          })


        });
      })

    }

  }

  return V1CardTagsController;

})();
