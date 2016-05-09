module.exports = (function() {

  "use strict";

  const Nodal = require('nodal');

  class CreateCardTags extends Nodal.Migration {

    constructor(db) {
      super(db);
      this.id = 2016050322493108;
    }

    up() {

      return [
        this.createTable("card_tags", [
          {"name":"card_id","type":"int"},
          {"name":"tag_id","type":"int"}
        ])
      ];

    }

    down() {

      return [
        this.dropTable("card_tags")
      ];

    }

  }

  return CreateCardTags;

})();
