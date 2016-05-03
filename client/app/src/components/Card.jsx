import React from 'react';

const Card = (props) => {
  return(
    <div>
      <li>
        {props.id}
        {props.link}
      </li>
    </div>
  )
};

export default Card;