module.exports = (function() {

  "use strict";

  const Nodal = require('nodal');

  class CreateTags extends Nodal.Migration {

    constructor(db) {
      super(db);
      this.id = 2016050319174777;
    }

    up() {

      return [
        this.createTable("tags", [{"name":"name","type":"string"}])
      ];

    }

    down() {

      return [
        this.dropTable("tags")
      ];

    }

  }

  return CreateTags;

})();
