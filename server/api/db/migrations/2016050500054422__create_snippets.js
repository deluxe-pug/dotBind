module.exports = (function() {

  "use strict";

  const Nodal = require('nodal');

  class CreateSnippets extends Nodal.Migration {

    constructor(db) {
      super(db);
      this.id = 2016050500054422;
    }

    up() {

      return [
        this.createTable("snippets", [{"name":"content","type":"string"},{"name":"card_id","type":"int"}])
      ];

    }

    down() {

      return [
        this.dropTable("snippets")
      ];

    }

  }

  return CreateSnippets;

})();
