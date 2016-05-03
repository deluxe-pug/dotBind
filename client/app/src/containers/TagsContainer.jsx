import React from 'react';
import { connect } from 'react-redux';
import Tag from '../components/Tag';

const TagsContainer = () => (
  <div>
    yo2
  </div>
);

const mapStateToProps = (state) => {
  return {
    tags: state.tags
  };
};


export default connect(mapStateToProps)(TagsContainer);