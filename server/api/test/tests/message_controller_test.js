module.exports = (() => {

  'use strict';

  const Nodal = require('nodal');

  class MessageControllerTest extends Nodal.mocha.Test {

    test(expect) {

      it('Should connect to v1/messages/ endpoint when not authenticated ', done => {

        this.endpoint('/v1/messages?access_token=dotBind').get((status, headers, body, json) => {
          // console.log('body', body.toString())
          expect(status).to.equal(200);
          done();

        });

      });

    }

  }

  return MessageControllerTest;

})();
