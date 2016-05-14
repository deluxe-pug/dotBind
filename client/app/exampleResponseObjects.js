// GET request to /v1/cards
{
  "meta": {
    "total": 37,
    "count": 37,
    "offset": 0,
    "error": null
  },
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "title": "Best Search Engine",
      "url": "http://google.com",
      "icon": "https://www.google.com/images/branding/product/ico/googleg_lodp.ico",
      "domain": "google.com",
      "code": "This is google",
      "text": null,
      "note": "a googler left this note",
      "cardTags": [
        {
          "tag": {
            "id": 1,
            "name": "React"
          }
        },
        {
          "tag": {
            "id": 4,
            "name": "Redux"
          }
        },
      ]
    },
  ],
}

// ELASTICSEARCH QUERY
{
  "query": {
    "bool": {
      "should": [{
        "match": {
          "title": keywords
        }, 
        "match": {
          "url": keywords
        },
        "match": {
          "code": keywords
        },
        "match": {
          "text": keywords
        },
        "match": {
          "note": keywords
        },
        "match": {
          "cardTags": keywords
        },
      }],
    },
  },
  "highlight": {
    "fields": {
      "title": {}
    }
  }

// RESPONSE FROM POSGRES

  ModelArray [
    Card {
      _relationshipCache: {},
      _joinsCache: { cardTags: [Object] },
      _joinsList: [ 'cardTags' ],
      _data: 
       { id: 1,
         icon: 'https://www.google.com/images/branding/product/ico/googleg_lodp.ico',
         url: 'http://google.com',
         title: 'Best Search Engine',
         user_id: 1,
         code: 'This is google',
         text: null,
         note: 'a googler left this note',
         domain: 'google.com',
         created_at: Wed May 11 2016 16:52:17 GMT-0700 (PDT),
         updated_at: Wed May 11 2016 16:52:17 GMT-0700 (PDT) },
      _changed: 
       { id: false,
         icon: false,
         url: false,
         title: false,
         user_id: false,
         code: false,
         text: false,
         note: false,
         domain: false,
         created_at: false,
         updated_at: false },
      _errors: {},
      _inStorage: true },

}

// RESPONSE FROM ELASTICSEARCH

{
    "took": 21,
    "timed_out": false,
    "_shards": {
      "total": 5,
      "successful": 5,
      "failed": 0
    },
    "hits": {
      "total": 1,
      "max_score": 1,
      "hits": [
        {
          "_index": "library",
          "_type": "cards",
          "_id": "AVSlRz9Y-Ir5FMesmZnn",
          "_score": 1,
          "_source": {
            "id": 37,
            "title": "title",
            "url": "http://www.google.com",
            "domain": "american.com",
            "code": "var hello = function() {};",
            "text": "This is my text",
            "note": "This is a note about my content",
            "cardTags": [
              "React",
              "Backbone"
            ]
          }
        }
      ]
    }
  }

// ELASTICSEARCH _bulk
{"index": {"_id": 1}}
{"id": 1, "url": "http://google.com", "title": "Best Search Engine", "user_id": 1, "icon": "https://www.google.com/images/branding/product/ico/googleg_lodp.ico", "domain": "google.com", "code": "This is google", "note": "a googler left this note"}
{"index": {"_id": 2}}
{"id": 2,"url": "http://facebook.com", "title": "Largest Friends Network", "user_id": 2, "icon": "https://www.facebook.com/rsrc.php/yl/r/H3nktOa7ZMg.ico", "domain": "facebook.com", "code": "var test = function() {};", "note": "a facebooker left this note"}
{"index": {"_id": 3}}
{"id": 3, "url": "http://airbnb.com", "title": "Your Home on Vacation", "user_id": 1, "icon": "https://a1.muscache.com/airbnb/static/logotype_favicon-21cc8e6c6a2cca43f061d2dcabdf6e58.ico", "domain": "airbnb.com", "text": "This is airbnb", "note": "An airbnber left this note"}
{"index": {"_id": 4}}
{"id": 4, "url": "http://amazon.com", "title": "Online Shopping Giant", "user_id": 1, "icon": "http://www.amazon.com/favicon.ico", "domain": "amazon.com", "code": "var test = function() {};", "note": "An amazoner left this note"}


// ES SEARCH RESPONSE
starting request { method: 'POST',
  path: '/library/cards/_search',
  body: { query: { bool: [Object] }, highlight: { fields: [Object] } },
  query: {} 
}

starting request { method: 'POST',
  path: '/library/_search',
  body: { query: { query_string: [Object] } },
  query: {} 
}


