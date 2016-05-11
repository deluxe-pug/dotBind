import React from 'react';
import SearchContainer from '../containers/SearchContainer';
import AddCardContainer from '../containers/AddCardContainer';

require("../styles/topbar.css");

class TopBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displaySearchBar: false,
      displayAddBar: false,
      displayDropdown: false,
    }
  }

  // toggleSearchBar() {
  //   this.setState({
  //     displaySearchBar: !this.state.displaySearchBar,
  //   });
  // }

  toggleAddBar() {
    this.setState({
      displayAddBar: !this.state.displayAddBar,
    });
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
              <a className="modal-trigger" 
                 onClick={() => this.toggleAddBar()} 
                 href="#modal1">
                <i className="material-icons small-icon">library_add</i>
              </a>
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

// <li>
//   { this.state.displaySearchBar ?
//     <SearchContainer /> : <span></span> }
// </li>

// <li>
//   <a onClick={() => this.toggleSearchBar()}>
//     <i className="material-icons small-icon">
//      search
//     </i>
//   </a>
// </li>

// { this.state.displayAddBar ? 
//   <AddCardContainer /> : <span></span> }
