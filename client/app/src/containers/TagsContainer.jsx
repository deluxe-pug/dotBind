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
    setTimeout(() => {
      this.props.fetchTags();
      const tagIntervalId = setInterval(this.props.fetchTags, 2000)
      localStorage.setItem('tagIntervalId', tagIntervalId);
    }, 150);
  }

  render() {
    return (
      <div>
        <h5>Tags</h5>
        <div className="collection">
          {this.props.tags.map( (tag) =>
            <Tag key={tag.id}{...tag} />
          )}
        </div>
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
