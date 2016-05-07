import React from 'react';

const CardTag = (props) => {
  return (
    <div>
      <span> hi</span>
      <span>{props.tag.name}</span>
    </div>
  );
};

export default CardTag;