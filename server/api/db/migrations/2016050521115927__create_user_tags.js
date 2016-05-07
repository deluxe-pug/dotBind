module.exports = (function() {

  "use strict";

  const Nodal = require('nodal');

  class CreateUserTags extends Nodal.Migration {

    constructor(db) {
      super(db);
      this.id = 2016050521115927;
    }

    up() {

      return [
        this.createTable("user_tags", [
          {"name":"user_id","type":"int"},
          {"name":"tag_id","type":"int"},
          {"name":"card_count", "type":"int"} // Cache column for denormalization
        ])
      ];

    }

    down() {

      return [
        this.dropTable("user_tags")
      ];

    }

  }

  return CreateUserTags;

})();
