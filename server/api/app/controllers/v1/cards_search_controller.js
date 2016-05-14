module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const PromiseMaker = require('bluebird').promisify;
  const elasticsearch = require('elasticsearch');

  const client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
  });

  class V1CardsSearchController extends Nodal.Controller {

    index() {

      console.log('QUERY============>: ', this.params.query);
      client.search(this.params.query.query, function(err, cards) {
        console.log('ES SEARCH RESPONSE: ', cards);
        console.log('ES SEARCH ERROR: ', error);
        this.respond( err || cards );
      }.bind(this));

    }

    show() {


    }

    create() {


    }

    update() {


    }

    destroy() {

    }

  }

  return V1CardsSearchController;

})();
