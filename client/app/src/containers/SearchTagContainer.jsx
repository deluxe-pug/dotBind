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

  handleClick(e) {
    // const nodes = Array.prototype.slice.call(e.currentTarget.children);
    // console.log(nodes);
    // const index = nodes.indexOf(e.target);
    // console.log(e.target);
    // console.log(index);
    this.props.switchDisplay(true, this.props.search.input)

  }


  render() {
    console.log('SearchTagContainer state has changed');
    return (
      <div className="search" id="search"
        onClick={(e) => this.handleClick(e)}>
        <form className="search-tags">
          {this.props.search.input.split(' ').map(button => (
            <SearchTag
             key={tagId++}
             name={button} />
          ))}
        </form>
      </div>
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
