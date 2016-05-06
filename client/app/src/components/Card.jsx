import React from 'react';

const Card = (props) => (

  <div className="col s12 m4">
    <div className="card custom-card">
      <div className="card-image waves-effect waves-block waves-light">
        <img className="activator" src={props.icon}></img>
      </div>
      <div className="card-content">
        <span className="card-title activator grey-text text-darken-4">Card Title</span>
        <p><a href={props.url}>{props.url}</a></p>
      </div>
      <div className="card-action">
        <a className="add-tag" href="#">
          <i className=" material-icons left">label_outline</i>
          add tag
        </a>
      </div>
    </div>
  </div>

);

export default Card;
