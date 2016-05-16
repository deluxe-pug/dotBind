import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { switchDisplayAction } from '../actions/searchActions';
import SearchTag from '../components/SearchTag';

let tagId = 0;

class SearchTagContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form className="search"
        onClick={() => this.props.switchDisplay(true)}>
        {console.log('SEARCHTAGCONTIANER: ', this.props.search.buttons)}
        {this.props.search.buttons.map(button => (
          <SearchTag
           key={tagId++}
           name={button} />
        ))}
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