import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import SearchContainer from '../containers/SearchContainer';
import SearchTagContainer from '../containers/SearchTagContainer';
import AddCardContainer from '../containers/AddCardContainer';
import UserProfileContainer from '../containers/UserProfileContainer';
import { switchDisplayAction } from '../actions/searchActions';
import {
  fetchCardsAction,
  fetchInboxAction,
  setToInboxAction,
  setToCardsAction,
  fetchInboxCountAction
} from '../actions/cardActions';

require("../styles/topbar.css");

class TopBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayDropdown: false,
      modalIsOpen: false,
    }
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  handleLogout() {
    const intervalId = localStorage.getItem('intervalId');
    const tagIntervalId = localStorage.getItem('tagIntervalId');
    window.clearInterval(intervalId);
    window.clearInterval(tagIntervalId);
    localStorage.clear(); // clear local storage upon logout
  }

  componentWillMount() {
    this.props.switchDisplay(true);
    this.props.fetchCount();
  }

  handleMyCards(){
    this.props.setToCards();
    this.props.fetchCards();
  }

  handleInbox(){
    this.props.setToInbox();
    this.props.fetchInbox();
  }

  render() {
    return (
      <div className='navbar-fixed topbar'>
        <nav className="topbar">
          <img className="dotbind-icon" src="../../icon.png" />
          <span className="dotbind-logo">dotBind</span>
          <ul className="topnav">
            <li>
              {this.props.search.display ? <SearchContainer /> : <SearchTagContainer />}
            </li>

            <li className={this.props.cardsState === 'myCards' ? 'darkened rel-pos' : 'rel-pos'}>
              <a onClick={this.handleMyCards.bind(this)}>
                <i className="material-icons small-icon">home</i>
              </a>
            </li>

            <li className={this.props.cardsState === 'inbox' ? 'darkened rel-pos' : 'rel-pos'}>
              <a onClick={this.handleInbox.bind(this)}>
                <div className="inbox-counter">{this.props.count}</div>
                <i className="material-icons small-icon">email</i>
              </a>
            </li>

            <li className="rel-pos">
              <a onClick={this.openModal.bind(this)}>
                <i className="material-icons small-icon">library_add</i>
              </a>

              <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal.bind(this)}
                style={customStyles} >
                <AddCardContainer />
              </Modal>
            </li>

            <li className="avatar rel-pos">
              <UserProfileContainer />
            </li>
          </ul>
          <ul id='dropdown1' className='dropdown-content'>
            <li><a onClick={this.handleLogout.bind(this)} href="/logout">Log out</a></li>
          </ul>
        </nav>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    cards: state.cards,
    search: state.search,
    cardsState: state.cardsState,
    count: state.inboxCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    switchDisplay: switchDisplayAction,
    fetchInbox: fetchInboxAction,
    fetchCards: fetchCardsAction,
    setToInbox: setToInboxAction,
    setToCards: setToCardsAction,
    fetchCount: fetchInboxCountAction,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);

const customStyles = {
  content : {
    top                   : '60px',
    left                  : 'auto',
    right                 : '55px',
    bottom                : 'auto',
  }
};
