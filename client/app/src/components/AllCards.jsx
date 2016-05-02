import React from 'react';
import Cards from './Cards';

const AllCards = ({cards}) => (
  <ul>
    {cards.map((card) => 
      <Card
        key={card.id}
        {...card} />
    )}
  </ul>
);

export default AllCards;