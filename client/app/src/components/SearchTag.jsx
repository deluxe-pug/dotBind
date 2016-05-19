import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { removeCardFilterAction } from '../actions/cardActions';
import { deleteSearchTagAction } from '../actions/searchActions';

class SearchTag extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="chip search-tag">
        {this.props.name}
        <i className="material-icons"
          onClick={(e) => {
            e.stopPropagation();
            if (this.props.search.input.length > 0) {
              let searchString = this.props.search.input.split(' ').filter(tag =>
                tag !== this.props.name
              ).join(' ');
              this.props.removeCardFilter(searchString);
              this.props.deleteSearchTag(this.props.name);
            }
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
    deleteSearchTag: deleteSearchTagAction,
    removeCardFilter: removeCardFilterAction,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchTag);
