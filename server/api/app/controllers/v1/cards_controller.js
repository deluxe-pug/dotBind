module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const PromiseMaker = require('bluebird').promisify;
  const Card = Nodal.require('app/models/card.js');
  const Snippet = Nodal.require('app/models/snippet.js');
  const User = Nodal.require('app/models/user.js');
  const Tag = Nodal.require('app/models/tag.js');
  const UserTag = Nodal.require('app/models/user_tag.js');
  const CardTag = Nodal.require('app/models/card_tag.js');

  const findOrCreateUser = PromiseMaker(User.findOrCreate, {context: User});
  const findOrCreateTag = PromiseMaker(Tag.findOrCreate, {context: Tag});
  const findOrCreateUserTag = PromiseMaker(UserTag.findOrCreate, {context: UserTag});
  const findOrCreateCardTag = PromiseMaker(CardTag.findOrCreate, {context: CardTag});
  const createCard = PromiseMaker(Card.create, {context: Card});


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
          "note": "This is a note about my content",
          "domain": "american.com"
        },
        "username": "public",
         "tags": [
          "React",
          "Backbone"
         ]
        }
      */ 
    create() {

          let username = this.params.body.username || '';
          let tags = this.params.body.tags || [];
          let card = this.params.body.card || {};
          let user_id;
          let card_id;
          let tag_id;

          const userAndTagPromises = [];
          const userTagPromises = [];
          const cardTagPromises = [];
          const cardTagAndUserTagPromises = [];
          const tagIds = [];


          // Create card
          createCard(card).then((aCard) => {
            card_id = aCard.get('id');

            // Add findOrCreateUser promise
            userAndTagPromises.push(findOrCreateUser({username}));

            // For each tag in tags, add a promise with name bound as first arg
            tags.forEach((tag) => {
              let name = tag;
              userAndTagPromises.push(findOrCreateTag({name}));
            });

            // Resolve User and Tag promises
            Promise.all(userAndTagPromises).then((values) => {
              user_id = values[0].get('id'); // get user id
              card.user_id = user_id;

              let tagModels = values.slice(1);

              tagModels.forEach((tagModel) => {
                tag_id = tagModel.get('id');
                userTagPromises.push(findOrCreateUserTag({tag_id, user_id}));
                cardTagPromises.push(findOrCreateCardTag({tag_id, card_id}));
              });

              // Resolve UserTag Promises
              Promise.all(userTagPromises).then((userTags) => {
                userTags.forEach((user_tag) => {
                  if (user_tag.get('card_count') === null) {
                    user_tag.set('card_count', 1); // initialize to 1
                    user_tag.save();
                  } else if (user_tag.get('card_count')) {
                    user_tag.set('card_count', user_tag.get('card_count') + 1)
                    user_tag.save();
                  }
                });

                // Resolve CardTag Promises
                Promise.all(cardTagPromises).then((cardTags) => {
                  this.respond(card);
                });
              });
            });            
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
