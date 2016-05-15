import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { switchDisplayAction } from '../actions/searchActions';

class SearchTagContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form className="search"
        onClick={() => this.props.switchDisplay(true)}>
        <div className="chip">
          Tag
          <i className="material-icons">close</i>
        </div>
      </form>
    );
  }

};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    switchDisplay: switchDisplayAction,
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(SearchTagContainer);