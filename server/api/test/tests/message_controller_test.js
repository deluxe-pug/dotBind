module.exports = (() => {

  'use strict';

  const Nodal = require('nodal');

  class MessageControllerTest extends Nodal.mocha.Test {

    test(expect) {

      // it('Should connect to v1/messages/ endpoint as public', done => {

      //   this.endpoint('/v1/messages?access_token=dotBind').post((status, headers, body, json) => {
      //     expect(status).to.equal(200);
      //     done();

      //   });

      // });

    }

  }

  return MessageControllerTest;

})();
