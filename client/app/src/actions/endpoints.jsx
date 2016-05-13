const endpoints = {
  cards: 'http://localhost:3000/v1/cards?access_token=dotBind',
  tags: 'http://localhost:3000/v1/tags',
  card_tags: 'http://localhost:3000/v1/card_tags',
  card_tags: 'http://localhost:3000/v1/card_tags',
  auth: 'http://localhost:8000/auth',
  elasticsearch: {
    root: 'http://localhost:9200',
    cards: 'http://localhost:9200/library/cards',
  }
};

export default endpoints;
