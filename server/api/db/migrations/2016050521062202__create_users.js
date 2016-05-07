module.exports = (function() {

  "use strict";

  const Nodal = require('nodal');

  class CreateUsers extends Nodal.Migration {

    constructor(db) {
      super(db);
      this.id = 2016050521062202;
    }

    up() {

      return [
        this.createTable("users", [{"name":"username","type":"string"}])
      ];

    }

    down() {

      return [
        this.dropTable("users")
      ];

    }

  }

  return CreateUsers;

})();
