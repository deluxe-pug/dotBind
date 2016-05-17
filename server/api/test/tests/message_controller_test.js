module.exports = (() => {

  'use strict';

  const Nodal = require('nodal');

  class MessageControllerTest extends Nodal.mocha.Test {

    test(expect) {

      it('Should connect to v1/messages/ endpoint as public', done => {

        this.endpoint('/v1/messages?access_token=dotBind').get((status, headers, body, json) => {
          expect(status).to.equal(200);
          done();

        });

      });

      // it('Should post to v1/messages/ endpoint as public', done => {
      //   const reqBody = JSON.stringify({ from: 'public', to: 'adam', card_id: '3' });
      //     console.log('--> this is the req body: ', reqBody);

      //   this.endpoint('/v1/messages?access_token=dotBind').post('test', (status, headers, body, json) => {
          
      //     console.log('--> this is the res body: ', body + '');

      //     expect(status).to.equal(200);
      //     done();

      //   });

      // });

    }

  }

  return MessageControllerTest;

})();
