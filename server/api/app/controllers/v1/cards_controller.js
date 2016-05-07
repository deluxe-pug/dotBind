module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const Card = Nodal.require('app/models/card.js');
  const Snippet = Nodal.require('app/models/snippet.js');
  const User = Nodal.require('app/models/user.js');
  const Tag = Nodal.require('app/models/tag.js');
  const UserTag = Nodal.require('app/models/user_tag.js');
  const CardTag = Nodal.require('app/models/card_tag.js');

  class V1CardsController extends Nodal.Controller {

    index() {

      var tag = 'agular';
      console.log('--> this is the query', this.params.query);
      Card.query()
        .join('snippets')
        .join('cardTags__tag')
        // .where({ cardTags__tag__name: 'react', cardTags__tag__name: 'angular' })
        // .where(this.params.query)
        .end((err, cards) => {

          // cards[0].joined('snippets')

          // cards[0].joined('cardTags')
          this.respond( err || cards, ['id', 'url', 'icon', 'domain', 'content', 'note', {cardTags: [{tag: ['id', 'name']}]}]);
          // this.respond( err || cards, ['id', 'url', {snippets: ['id', 'content']}, {cardTags: ['id', {tag: 'name'}]} ]);

          // this.respond( err || cards, ['url', {cardTags: ['tag']}] );
          // this.respond( err || cards, ['id', 'url', {cardTags: [{ tag: ['id','name']}]}] );

        });

    }

    show() {

      Card.find(this.params.route.id, (err, model) => {

        this.respond(err || model);

      });

    }

    /* Sample POST Request
       {
           "card": {
              "url": "http://american.com",
              "content": "This is my content",
              "note": "This is a note about my content"
            },
            "username": "public"
           "snippets": [
              {
                 "content": "american"
               },
               {
                 "content": "pie"
               }
           ],
           "tags": [
              {
                "name": "React"
              },
              {
                "name": "Backbone"
              }
           ]
        }
      */ 
    create() {


      //     let snippetBody = {card_id: card_id, content: snippet.content};

      //     Snippet.create(snippetBody, (err, snippet) => {
      //       if (err) this.respond(err);
      //       snippetRecords.push(snippet);
      //     });
          
      //   });

        // iterate through tags
          // query where name === db tag name
            // if existing, grab corresponding tag id

          // create entry for CardTag - {card_id: card_id, tag_id: ?}

          let username = this.params.body.username || '';
          let tags = this.params.body.tags || [];
          let card = this.params.body.card || {};
          let user_id;
          let card_id;
          let tag_id;

          console.log(Promise.all);

          // User.query()
          //   .where({username})
          //   .end((err, users) => {
          //     // if any users with username
          //     if (users.length) { 
          //       user_id = users[0].get('id'); 
          //       // do something with user
          //     } else {
          //       // otherwise, create a user
          //       User.create({username}, (err, user) => {
          //         console.log('new user id: ', user.get('id'));
          //       })
          //     }
          //     // response
          //   })
          User.findOrCreate({username}, (err, user) => {
            user_id = user.get('id');
            card.user_id = user_id;
            // assume 1 tag , promises
            let name = tags[0].name;
            Tag.findOrCreate({name}, (err, tag) => {
              tag_id = tag.get('id');
              UserTag.findOrCreate({tag_id, user_id}, (err, user_tag) => {
                // if card count is null
                if (user_tag.get('card_count') === null) {
                  user_tag.set('card_count', 1); // initialize to 1
                  user_tag.save();
                } else if (user_tag.get('card_count')) {
                  user_tag.set('card_count', user_tag.get('card_count') + 1)
                  user_tag.save();
                }
                Card.create(card, (err, card) => {
                  card_id = card.get('id');
                  CardTag.findOrCreate({tag_id, card_id}, (err, card_tag) => {
                    this.respond(err || card);
                  });
                })
              })
            });
          })
          // this.respond('Response!')
        // this.respond([ card, snippetRecords ]);

      // });
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
