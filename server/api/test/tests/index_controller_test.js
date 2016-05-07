module.exports = (() => {

  'use strict';

  const Nodal = require('nodal');

  class IndexControllerTest extends Nodal.mocha.Test {

    test(expect) {

      it('Should return an HTTP 200 at /', done => {

        this.endpoint('/').get((status, headers, body, json) => {
          // console.log('body', body.toString())
          expect(status).to.equal(200);
          done();

        });

      });

    }

  }

  return IndexControllerTest;

})();
