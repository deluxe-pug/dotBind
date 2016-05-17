import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { searchCardsAction } from '../actions/cardActions';
import { removeCardFilterAction, searchCardsAction } from '../actions/cardActions';
import { deleteSearchTagAction } from '../actions/searchActions';

class SearchTag extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   document.getElementById('search-tag').addEventListener('click', function() {
  //     let searchString = this.props.search.input.split(' ').filter(tag =>
  //       tag !== this.props.name
  //     ).join(' ');
  //     this.props.removeCardFilter(searchString);
  //     this.props.deleteSearchTag(this.props.name);
  //   })
  // }

  render() {
    return (
      <div className="chip">
        {this.props.name}
        <i className="material-icons search-tag" id="search-tag"
          onMouseOver={() => {
            console.log('mouse is here');
            document.getElementById('search').style.pointerEvents = 'none';
            document.getElementById('search-tag').addEventListener('click', function() {
              console.log('i clickd');
            })
          }}>
          close
        </i>
      </div>
    ); 
  }
};


// onClick={() => {
//   let searchString = this.props.search.input.split(' ').filter(tag =>
//     tag !== this.props.name
//   ).join(' ');
//   this.props.removeCardFilter(searchString);
//   this.props.deleteSearchTag(this.props.name);
// }}


const mapStateToProps = (state) => {
  return {
    search: state.search,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    searchCards: searchCardsAction,
    deleteSearchTag: deleteSearchTagAction,
    removeCardFilter: removeCardFilterAction,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchTag);
