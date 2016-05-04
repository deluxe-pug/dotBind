import React from 'react';

const Card = (props) => (
  <div className="row">
    <div className="col s12 m4">
      <div className="card">
        <div className="card-image waves-effect waves-block waves-light">
          <img className="activator" src={props.icon}></img>
        </div>
        <div className="card-content">
          <span className="card-title activator grey-text text-darken-4">Card Title<i className="material-icons right">more_vert</i></span>
          <p><a href={props.url}>{props.url}</a></p>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
          <p>{props.highlight}</p>
        </div>
      </div>
    </div>
  </div>
);

export default Card;