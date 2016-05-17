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

  // handleClick() {
  //   const nodes = Array.prototype.slice.call(e.currentTarget.children);
  //   const index = nodes.indexOf(e.target);
  //   console.log(index);
  // }


  render() {
    console.log('SearchTagContainer state has changed');
    return (
      <div className="search" id="search"
        onClick={() => {
          this.props.switchDisplay(true, this.props.search.input)
        }}>
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
