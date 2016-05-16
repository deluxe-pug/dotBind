import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUserAction } from '../actions/userActions';

class UserProfileContainer extends React.Component {

  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <a className='dropdown-button'
         href='#' data-beloworigin="true" data-activates='dropdown1'>
        <img src={this.props.user && this.props.user.img ? this.props.user.img : 'http://pritishc.com/images/social/github.png'} alt="An image" className="material-icons circle" height="50px" width="50px" />
      </a>
    );
  }
}

// state passed in is application state
const mapStateToProps = (state) => {
  // whatever is returned will show up as props inside AllCardsContainer
  // will re-render whenever application state changes
  return {
    user: state.user,
  };
};

// anything returned will end up as props on AllCards container
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchUser: fetchUserAction }, dispatch);
  // inside container: can call this.props.fetchCards


export default connect(mapStateToProps, mapDispatchToProps)(UserProfileContainer);
