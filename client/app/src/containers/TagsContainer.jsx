import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTagsAction } from '../actions/tagActions';
import Tag from '../components/Tag';


class TagsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchTags();
  }

  render() {
    return (
      <div>
        {this.props.tags.map( (tag) =>
          <Tag key={tag.id}{...tag} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tags: state.tags
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchTags: fetchTagsAction}, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(TagsContainer);







// const TagsContainer = ({tags}) => (
//   <div>
//     {tags.map( (tag) =>
//       <Tag key={tag.id}{...tag} />
//     )}
//   </div>
// );
