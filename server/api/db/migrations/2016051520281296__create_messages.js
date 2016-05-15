module.exports = (function() {

  "use strict";

  const Nodal = require('nodal');

  class CreateMessages extends Nodal.Migration {

    constructor(db) {
      super(db);
      this.id = 2016051520281296;
    }

    up() {

      return [
        this.createTable("messages", [
          {"name": "from_user_id", "type": "int"},
          {"name": "to_user_id", "type": "int"},
          {"name": "card_id", "type": "int"}
        ])
      ];

    }

    down() {

      return [
        this.dropTable("messages")
      ];

    }

  }

  return CreateMessages;

})();
