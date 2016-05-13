module.exports = (function() {

  "use strict";

  const Nodal = require('nodal');

  class CreateAccessTokens extends Nodal.Migration {

    constructor(db) {
      super(db);
      this.id = 2016051002123395;
    }

    up() {

      return [
        this.createTable("access_tokens", [
          {"name":"user_id","type":"int"},
          {"name":"access_token","type":"string"},
          {"name":"token_type","type":"string"},
          {"name":"expires_at","type":"datetime"},
          {"name":"ip_address","type":"string"}
        ])
      ];

    }

    down() {

      return [
        this.dropTable("access_tokens")
      ];

    }

  }

  return CreateAccessTokens;

})();
