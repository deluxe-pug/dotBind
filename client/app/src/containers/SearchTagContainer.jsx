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
        <form className="search-tags"
          onClick={() => 
            this.props.switchDisplay(true, this.props.search.input)
          }>
          {this.props.search.input.split(' ').map(button => (
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
