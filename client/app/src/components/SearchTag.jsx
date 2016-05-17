import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { searchCardsAction } from '../actions/cardActions';

class SearchTag extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="chip">
        {this.props.name}
        <i className="material-icons" onClick={() => {
          this.props.searchCards('something')
        }}>
          close
        </i>
      </div>
    ); 
  }
};

const mapStateToProps = (state) => {
  return {
    search: state.search,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    searchCards: searchCardsAction,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchTag);
