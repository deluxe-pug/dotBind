import React from 'react';
import Modal from 'react-modal';
import SearchContainer from '../containers/SearchContainer';
import SearchTagContainer from '../containers/SearchTagContainer';
import AddCardContainer from '../containers/AddCardContainer';
import UserProfileContainer from '../containers/UserProfileContainer';

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
    localStorage.clear(); // clear local storage upon logout
  }


  render() {
    return (
      <div className='navbar-fixed topbar'>
        <nav className="topbar">
          <span className="dotbind-logo">dotBind</span>
          <ul className="topnav">
            <li>
              {this.props.search ? <SearchContainer /> : <SearchTagContainer />}
             </li>

            <li>
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

            <li>
              <a className='dropdown-button'
                 href='#' data-beloworigin="true" data-activates='dropdown1'>
                <i className="material-icons small-icon">more_vert</i>
              </a>
            </li>
            <li className="avatar">
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
    search: state.search
  };
};

export default TopBar;

const customStyles = {
  content : {
    top                   : '60px',
    left                  : 'auto',
    right                 : '55px',
    bottom                : 'auto',
  }
};
