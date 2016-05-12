import React from 'react';
import Modal from 'react-modal';
import SearchContainer from '../containers/SearchContainer';
import AddCardContainer from '../containers/AddCardContainer';

require("../styles/topbar.css");

class TopBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayDropdown: false,
    }
  }

  getInitialState() {
    return { modalIsOpen: false };
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }


  render() {
    return (
      <div className='navbar-fixed topbar'>
        <nav className="topbar">
          <span className="dotbind-logo">dotBind</span>
          <ul className="topnav">
            <li>
              <SearchContainer />
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
          </ul>

          <ul id='dropdown1' className='dropdown-content'>
            <li><a href="#!">Log out</a></li>
          </ul> 
        </nav>
      </div>
    )
  }
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