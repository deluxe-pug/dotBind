## Internal API Documentation
#### Card Endpoints
|Description|Endpoint|
|---|---|
|[Get all Cards](#get-cards)|GET /cards|
|[Save a Card](#post-cards)|POST /cards|
|[Update a Card](#put-cards-id)|PUT /cards/:id|
|[Destroy a Card](#delete-cards-id)|DELETE /cards/:id|

#### Tag Endpoints
|Description|Endpoint|
|---|---|
|[Get all tags](#get-tags)|GET /tags/|
|[Create a tag](#post-tags)|POST /tags/|

#### Access Token Endpoints
|Description|Endpoint|
|---|---|
|[Login a User](#post-access_tokens)|POST /access_tokens/|
|[Logout a User](#delete-access_tokens-id)|DELETE /access_tokens/:id|

#### User Endpoints
|Description|Endpoint|
|---|---|
|[Create a user](#post-access_tokens)|POST /users/|


#### UserTag Endpoints

#### CardTag Endpoints

#### Message Endpoints

#### Search Endpoints

* Note: All endpoints except access_tokens require requests to have user access tokens sent as a query string.

## `GET cards`

Fetches a user's cards

### Example Request
```bash
curl -H 'Accept: auth-url' -H 'Authorization: OAuth <access_token>' \
-X GET https://BASE_API_URL + 
{
  'client_id': CLIENT_ID,
  'client_secret': CLIENT_SECRET,
  'grant_type': 'authorization_code',
  'code': request.args.get('code'),
  'redirect_uri': REDIRECT_URI,
  'scope': DEFAULT_SCOPE
}
```


## `POST /user/relativesinfo/`

Gathers information about the current user's relatives

### Example Request
```bash
{
  'user_profile_id': 'profile_id',
  'headers': {
    'cookie': {
      'token': 'asj238xlzhs_uw28hzbhslsm8es9'
    }
  }
}
```

### Example Response
```json
{
  "user_profile_id": "profile_id",
  "relatives": [
    {"relative1": {
      "first_name": "Foo",
      "last_name": "Bar",
      "sex": "m/f",
      "residence": "California",
      "similarity": 0.25,
      "maternal_side": "False",
      "paternal_side": "True",
      "birth_year": 1992,
      "relationship": "Brother",
      "birthplace": "United States",
      "ancestry": "Northwestern Europe",
      "picture_url": ""
    }},
    {"relative2": {
      "first_name": "Foo2",
      "last_name": "Bar2",
      "sex": "m/f",
      "residence": "California",
      "similarity": 0.25,
      "maternal_side": "False",
      "paternal_side": "True",
      "birth_year": 1990,
      "relationship": "Sister",
      "birthplace": "United States",
      "ancestry": "Northwestern Europe",
      "picture_url": ""
    }},
    ...
  ]
}
```
