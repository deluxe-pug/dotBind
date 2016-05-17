module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const PromiseMaker = require('bluebird').promisify;
  const elasticsearch = require('elasticsearch');

  const client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
  });

  const headers = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10, // Seconds.
    'Content-Type': 'application/json'
  };

  class V1CardsSearchController extends Nodal.Controller {

    index() {
      console.log('QUERY============>: ', this.params.query); // query: '{"index":"library","body":{"query":{"query_string":{"query":"hi"}}}}'
      // client.search(JSON.parse(this.params.query.query), function(error, cards) {
      //   if (error) {
      //     console.log('ES SEARCH ERROR: ', error);
      //   }
      //   console.log('ES SEARCH RESPONSE: ', cards.hits.hits);
      //   this.respond( error || cards.hits.hits );
      // }.bind(this));
      this.respond('Ok');
    }

    show() {}

    create() {}

    update() {}

    destroy() {}

  }

  return V1CardsSearchController;

})();
