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
          {this.props.search.buttons[0]}
          <i className="material-icons">close</i>
        </div>
      </form>
    );
  }

};

const mapStateToProps = (state) => {
  return {
    search: state.search
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    switchDisplay: switchDisplayAction,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchTagContainer);