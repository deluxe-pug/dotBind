import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filterCardsAction, setToFilterAction } from '../actions/cardActions';


class Tag extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.tagName, ' <---> ', props.card_count);
  }

  handleFilter(){
    this.props.filterCards(this.props.tagName);
    this.props.setToFilter();
  }

  render() {
    return (
        <a className="collection-item" onClick={this.handleFilter.bind(this)}>
          {this.props.tagName}
          <span className="badge">{this.props.card_count}</span>
        </a>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    cardsState: state.cardsState
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({filterCards: filterCardsAction, setToFilter: setToFilterAction}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Tag);

// <div className="tag">
//     <span>#{props.name}</span>
// </div>
