import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { shareCardAction } from '../actions/cardActions';
import { searchUsersAction, clearUsersAction } from '../actions/userActions';

require('../styles/popoutform.css');

let input = null;
class ShareModal extends React.Component {

  constructor(props) {
    super(props);
  }

  handleSearchUsers() {
    if ( input.value.trim().length < 3 ) { 
      this.props.clearUsers(); 
    } else {
      this.props.searchUsers(input.value.trim());
      console.log('this is the props', this.props.foundUsers);
    }
  }

  handleSend(event){
    const toUser = $(event.currentTarget).text().replace('email', '');
    this.props.shareCard(toUser, this.props.cardId);
    this.notifySent();
  }

  notifySent(){
    Materialize.toast('Card Sent!', 2000, 'rounded notication');
  }

  render() {
    return (
      <div id="popup1" className="overlay">
          <div className="popup">
              <a className="close" href="#">&times;</a>
              <div className="container">
                <div className="row">
                  <form onSubmit={ e => {
                    e.preventDefault();
                    if ( !input.value.trim() ) {
                      return;
                    }
                    this.props.shareCard(input.value, this.props.cardId);
                    console.log(input.value);
                  }}>

                    <div className="col s12">
                      <input onChange={this.handleSearchUsers.bind(this)} type="text" ref={node => input = node} placeholder="github handle" />
                    </div>

                    <div className="col s12">
                      {this.props.foundUsers.map( (user) =>
                        <div key={user.id} onClick={this.handleSend.bind(this)} className="chip hoverable">
                          {user.username}
                        </div>
                      )}
                    </div>

                  </form>

                </div>
              </div>
          </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    foundUsers: state.foundUsers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    shareCard: shareCardAction,
    searchUsers: searchUsersAction,
    clearUsers: clearUsersAction
  }, dispatch);
};

ShareModal = connect(mapStateToProps, mapDispatchToProps)(ShareModal);
export default ShareModal;
