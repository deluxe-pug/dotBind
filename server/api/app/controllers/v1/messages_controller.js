module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const Message = Nodal.require('app/models/message.js');
  const Card = Nodal.require('app/models/card.js');
  const User = Nodal.require('app/models/user.js');

  const AuthController = Nodal.require('app/controllers/auth_controller.js');

  class V1MessagesController extends AuthController {

    index() {
      this.authorize((err, accessToken, user) => {
        if (err) { return this.respond(err); }
        const user_id = user.get('id');

        Card.query()
          .join('cardTags__tag')
          .join('messages')
          .where({messages__to_user_id: user_id})
          .end((err, cards) => {
            this.respond( err || cards, [
              'id',
              'user_id',
              'title',
              'url',
              'icon',
              'domain',
              'code',
              'text',
              'note',
              {messages: ['id']},
              {cardTags: [
                'id', 
                {tag: [
                  'id',
                  'name'
                ]}
              ]}
            ]);
          });     

      })

    }

    show() {

      Message.find(this.params.route.id, (err, model) => {

        this.respond(err || model);

      });

    }

    create() {
      // --> this.params.body: { from: 'public', to: 'michelleheh', card_id: '3' }
      const from_user = this.params.body.from;
      const to_user = this.params.body.to;
      const card_id = this.params.body.card_id;

      User.query()
        .where({username: from_user})
        .end((err, models) => {
          const from_user_id = models[0].get('id');
          User.query()
            .where({username: to_user})
            .end((err, models) => {
              const to_user_id = models[0].get('id');
              const message_count = models[0].get('message_count') === null ? 1 : models[0].get('message_count') + 1;

              Message.create({from_user_id, to_user_id, card_id}, (err, model) => {
                this.respond(err || model);
              });
              // update cache column in user table
              User.update(to_user_id, {message_count}, (err, user) => {
                if (err) { console.log('--> err in adding message_count', err); }
              });
            });
        });
    }

    update() {

      Message.update(this.params.route.id, this.params.body, (err, model) => {

        this.respond(err || model);

      });

    }

    destroy() {
      // sample url string /v1/messages/2?access_token=dotBind
      this.authorize((err, accessToken, user) => {
        if (err) { return this.respond(err); }
        const to_user_id = user.get('id');

        console.log('--> this is this.params', this.params.route.id)
        const card_id = this.params.route.id;

        Message.query()
          .where({card_id, to_user_id})
          .end((err, models) => {
            // update cache column in user table
            User.query()
              .where({id: to_user_id})
              .end((err, models) => {
                console.log('--> message_count: ', models[0].get('message_count'));
                const message_count = models[0].get('message_count') - 1;
                User.update(to_user_id, {message_count}, (err, user) => {
                  console.log('--> updated user: ', user);
                  if (err) { console.log('--> err in subtracting message_count', err); }
                });
              });

            Message.destroy(models[0].get('id'), (err, model) => {
              this.respond(err || model);
            });


          });
      });

    }

  }

  return V1MessagesController;

})();
