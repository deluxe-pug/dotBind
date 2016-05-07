import React from 'react';

const Tag = (props) => {
  return (
    <div className="tag">
        <span>#{props.name}</span>
    </div>
  );
};

export default Tag;
