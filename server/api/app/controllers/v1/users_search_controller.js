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

  class V1UsersSearchController extends Nodal.Controller {

    index() {
      // console.log('============> this.params.query in users_search_controller: ', this.params.query);
      // // this.params.query = {
      //   // query: {
      //   //   wildcard: {
      //   //     username: {
      //   //       value: "*test*"
      //   //     }
      //   //   }
      //   // }
      // // };
      // client.search(JSON.stringify(this.params.query), function(error, users) {
      //   if (error) {
      //     console.log('ES SEARCH ERROR: ', error);
      //     this.respond( 'error in user search Controller' );
      //   }
      //   console.log('ES SEARCH RESPONSE: ', users.hits.hits);
      //   const usernames = users.hits.hits.reduce((previous, current)=> { return previous.concat(current._source.username)}, [])
      //   this.respond( error || usernames );
      // }.bind(this));
    }

    show() {}

    create() {
      // this.params.body = {
        // query: {
        //   wildcard: {
        //     username: {
        //       value: "*test*"
        //     }
        //   }
        // }
      // };
      console.log('this is this.params.body ------------->', this.params.body);
      const query = {
        index: 'users',
        body: this.params.body
      };
      client.search(query, function(error, users) {
        if (error) {
          console.log('ES SEARCH ERROR: ', error);
          this.respond( 'error in client.search' );
        }
        console.log('ES SEARCH RESPONSE: ', users.hits.hits);
        const usernames = users.hits.hits.reduce((previous, current)=> { return previous.concat(current._source.username)}, [])
        this.respond( error || usernames );
      }.bind(this));
    }

    update() {}

    destroy() {}

  }

  return V1UsersSearchController;

})();
