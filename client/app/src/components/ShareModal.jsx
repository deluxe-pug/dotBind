import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { shareCardAction } from '../actions/cardActions';
import { searchUsersAction } from '../actions/userActions';

require('../styles/popoutform.css');

let input = null;
class ShareModal extends React.Component {

  constructor(props) {
    super(props);
  }

  testFunc() {
    this.props.searchUser("michel");
  }

  render() {
    return (
      <div id="popup1" className="overlay">
          <div className="popup">
              <h4>Share this card </h4>
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
                    <div className="col s8">
                      <input type="text" ref={node => input = node} placeholder="github handle" />
                      <a className='dropdown-button btn' data-activates='dropdown1'>Drop Me!</a>

                    </div>

                      <ul id='dropdown1' className='dropdown-content anything'>
                        <li><a href="#!">one</a></li>
                        <li><a href="#!">two</a></li>
                        <li class="divider"></li>
                        <li><a href="#!">three</a></li>
                      </ul>
                    <div className="col s4">
                      <button type="submit" className="waves-effect waves-light btn">
                        Share!
                      </button>
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
    searchUser: state.searchUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    shareCard: shareCardAction,
    searchUser: searchUsersAction,
  }, dispatch);
};

ShareModal = connect(mapStateToProps, mapDispatchToProps)(ShareModal);
export default ShareModal;
