module.exports = (() => {

  'use strict';

  const Nodal = require('nodal');

  class TagsControllerTest extends Nodal.mocha.Test {

    test(expect) {

      it('Should connect v1/tags/ endpoint', done => {

        this.endpoint('/v1/tags/').get((status, headers, body, json) => {

          expect(status).to.equal(200);
          done();

        });

      });

    }

  }

  return TagsControllerTest;

})();
