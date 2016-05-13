module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const PromiseMaker = require('bluebird').promisify;
  const Card = Nodal.require('app/models/card.js');
  const User = Nodal.require('app/models/user.js');
  const Tag = Nodal.require('app/models/tag.js');
  const UserTag = Nodal.require('app/models/user_tag.js');
  const CardTag = Nodal.require('app/models/card_tag.js');

  const findOrCreateUser = PromiseMaker(User.findOrCreate, {context: User});
  const findOrCreateTag = PromiseMaker(Tag.findOrCreate, {context: Tag});
  const findOrCreateUserTag = PromiseMaker(UserTag.findOrCreate, {context: UserTag});
  const findOrCreateCardTag = PromiseMaker(CardTag.findOrCreate, {context: CardTag});
  const createCard = PromiseMaker(Card.create, {context: Card});

  const AuthController = Nodal.require('app/controllers/auth_controller.js');

  /* ElasticSearch */
  const elasticsearch = require('elasticsearch');
  const client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
  });

  class V1CardsController extends AuthController {

    index() {
      this.authorize((err, accessToken, user) => {
        if (err) {
          return this.respond(err);
        }

        const user_id = user.get('id');

      // console.log('INDEX PARAMS TYPE: ', typeof this.params.query);
      // console.log('MY OBJECT!! ', this.params.query);

      // if (this.params.query.hasOwnProperty('0')) {
      //   client.search(this.params.query['0'])
      //     .then((response) => {
      //       console.log('ES SEARCH RESPONSE: ', response);
      //       console.log('another console.log');
      //         this.respond(response.hits.hits);
      //       }, (error) => 
      //       console.log('ES SEARCH ERROR: ', error)
      //     )
      // }
      console.log('ANYTHING??????', this.params.query);

      if (this.params.query.query) {
        console.log('QUERY============>: ', this.params.query);
        client.search(this.params.query.query, function(err, cards) {
          console.log('ES SEARCH RESPONSE: ', cards);
          console.log('ES SEARCH ERROR: ', error);
          this.respond( err || cards );
          // console.log('ES SEARCH THIS: ', this);
        }.bind(this));
      } else {
        Card.query()
          .join('cardTags__tag')
          .where(this.params.query)
          .end((err, cards) => {
            // console.log("DB CARDS: ", cards);
            this.respond( err || cards, ['id', 'user_id', 'title', 'url', 'icon', 'domain', 'code', 'text', 'note', {cardTags: [{tag: ['id', 'name']}]}]);
          });     
      }
    })
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
          "title": "about USA",
          "code": "var hello = function() {};",
          "text": "This is my text",
          "note": "This is a note about my content",
          "icon": "An icon",
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
      this.authorize((err, accessToken, user) => {
        if (err) {
          return this.respond(err);
        }
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
            aCard.set('user_id', user_id);
            aCard.save();

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
                this.respond(aCard, ['id', 'user_id', 'title', 'url', 'icon', 'domain', 'code', 'text', 'note']);
                // this.respond([aCard, tags]);

                // console.log('aCard: ', aCard._data);
                // console.log('tags: ', tags);
                console.log('ELASTICSEARCH!!!!!');

                const cardData = aCard._data;
                const tagData = tags;
                const esPost = {
                  index: 'library',
                  type: 'cards',
                  body: {
                    id: cardData.id,
                    title: cardData.title,
                    url: cardData.url,
                    domain: cardData.domain,
                    code: cardData.code,
                    text: cardData.text,
                    note: cardData.note,
                    cardTags: tags,
                  },
                };

                client.create(esPost)
                  .then((response) => 
                    console.log('response: ', response),
                    (error) => 
                    console.log('error: ', error)
                  );
                });
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
