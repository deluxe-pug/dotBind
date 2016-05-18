module.exports = (function() {

  const elasticsearch = require('elasticsearch');
  const client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
  });

  let esId;

  const getESId = (cardId) => {
    const query = {
      index: "library",
      type: "cards",
      body: {
        "query": {
          "bool": {
            "must": [{ match: {id: cardId} }],
          },
        },
      }
    };

    client.search(query, (err, response) => {
      if (err) {
        console.error('Search error before PUT. Inspect cards controller: ', err);
      } else {
        esId = response.hits.hits[0]._id;
      }
    });

  };

  return esId;

})();
