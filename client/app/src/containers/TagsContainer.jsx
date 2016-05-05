import React from 'react';
import { connect } from 'react-redux';
import Tag from '../components/Tag';


class TagsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  render() {
    return (
      <div>
        {this.props.tags.map( (tag) =>
          <Tag key={tag.id}{...tag} />
        )};
      </div>
    );
  }
}





// const TagsContainer = ({tags}) => (
//   <div>
//     {tags.map( (tag) =>
//       <Tag key={tag.id}{...tag} />
//     )}
//   </div>
// );

const mapStateToProps = (state) => {
  return {
    tags: state.tags
  };
};


export default connect(mapStateToProps)(TagsContainer);
