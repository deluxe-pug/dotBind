// var React = require('react');
// var ReactDOM = require('react-dom');
// import React from 'react';
// import ReactDOM from 'react-dom';
console.log(React);
// import Voting from './components/Voting';

const pair = ['Trainspotting', '28 Days Later'];

class Voting extends React.Component {
  constructor(props) {
    super(props);
  }

  getPair() {
    return this.props.pair || [];
  }

  render() {
    return <div className="voting">
      {this.getPair().map(entry =>
        <button key={entry}>
          <h1>{entry}</h1>
        </button>
      )}
    </div>;
  }
};

ReactDOM.render(
  <Voting pair={pair} />,
  document.getElementById('app')
);
