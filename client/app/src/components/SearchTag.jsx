import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { searchCardsAction } from '../actions/cardActions';
import { deleteSearchTagAction } from '../actions/searchActions';

class SearchTag extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="chip">
        {this.props.name}
        <i className="material-icons" onClick={() => {
          const remainingSearchInput = [];
          this.props.search.input.split(' ').forEach(tag => {
            if (tag !== this.props.name) {
              remainingSearchInput.push(tag);
            }
          });
          console.log('remainingSearchInput ', remainingSearchInput);
          if (remainingSearchInput) {
            let remainingSearchString = '';
            remainingSearchInput.forEach(tag => {
              remainingSearchString.concat(tag);
            })            
          }
          console.log('remainingSearchString ', remainingSearchString)
          this.props.searchCards('remaining keyword');
          this.props.deleteSearchTag(this);
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
    deleteSearchTag: deleteSearchTagAction,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchTag);
