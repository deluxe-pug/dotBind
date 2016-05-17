import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

require('../styles/popoutform.css');

const ShareModal = () => (
  <div id="popup1" className="overlay">
      <div className="popup">
          <h2>Here i am</h2>
          <a className="close" href="#">&times;</a>
          <div className="content">
              Thank to pop me out of that button, but now im done so you can close this
          </div>
      </div>
  </div>
);

export default ShareModal;
