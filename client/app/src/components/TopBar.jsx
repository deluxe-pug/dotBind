import React from 'react';
import SearchContainer from '../containers/SearchContainer';
import AddCardContainer from '../containers/AddCardContainer';

class TopBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displaySearchBar: false,
      displayAddBar: false,
      displayDropdown: false,
    }
  }

  toggleSearchBar() {
    this.setState({
      displaySearchBar: !this.state.displaySearchBar,
    });
  }

  toggleAddBar() {
    this.setState({
      displayAddBar: !this.state.displayAddBar,
    });
  }

  render() {
    return (
      <div className="navbar-fixed">
      <nav className="topbar">
        <div className="nav-wrapper">
          <a href="#!" className="brand-logo dotbind-logo">dotBind</a>

          <ul className="right hide-on-med-and-down">

            <li>
              { this.state.displaySearchBar ?
                <SearchContainer /> : <span></span> }
            </li>

            <li>
              <a onClick={() => this.toggleSearchBar()}>
                <i className="material-icons">
                 search
                </i>
              </a>
            </li>

            <li>
              <a className="modal-trigger" 
                 onClick={() => this.toggleAddBar()} 
                 href="#modal1">
                <i className="material-icons">library_add</i>
              </a>
            </li>

            <li>
              <a className='dropdown-button'
                 href='#' data-beloworigin="true" data-activates='dropdown2'>
                <i className="material-icons">add</i>
              </a>
            </li>

            <li>
              <a className='dropdown-button'
                 href='#' data-beloworigin="true" data-activates='dropdown1'>
                <i className="material-icons">more_vert</i>
              </a>
            </li>

          </ul>

        </div>

        <ul id='dropdown1' className='dropdown-content'>
          <li><a href="#!">Log out</a></li>
        </ul> 

        <ul id='dropdown2' className='dropdown-content'>
        </ul>
        
        { this.state.displayAddBar ? 
          <AddCardContainer /> : <span></span> }
      </nav>
      </div>
    )
  }
};

export default TopBar;
