module.exports = (() => {

  'use strict';

  const Nodal = require('nodal');

  class CardsControllerTest extends Nodal.mocha.Test {

    test(expect) {

      it('Shoud connect v1/cards/ endpoint', done => {

        this.endpoint('/v1/cards/').get((status, headers, body, json) => {

          expect(status).to.equal(200);
          done();

        });

      });

    }

  }

  return CardsControllerTest;

})();
