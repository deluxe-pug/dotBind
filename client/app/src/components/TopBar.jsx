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

  // toggleDropdown() {
  //   this.setState({
  //     displayDropdown: !this.state.displayDropdown,
  //   });
  // }

  render() {
    return (
      <nav className="translucent">
        <div className="nav-wrapper">
          <a href="#!" className="brand-logo dotbind-logo">dotBind</a>

          <ul className="right hide-on-med-and-down">

            <li>
              { this.state.displaySearchBar ?
                <SearchContainer /> : <span></span> }
            </li>

            <li>
              <a onClick={() => this.toggleSearchBar()}>
                <i className="material-icons black-icon">
                 search
                </i>
              </a>
            </li>

            <li>
              <a className="waves-effect waves-light modal-trigger" 
                 onClick={() => this.toggleAddBar()} 
                 href="#modal1">
                <i className="material-icons black-icon">library_add</i>
              </a>
            </li>

            <li>
              <a className='dropdown-button'
                 href='#' data-beloworigin="true" data-activates='dropdown2'>
                <i className="material-icons black-icon">add</i>
              </a>
            </li>

            <li>
              <a className='dropdown-button'
                 href='#' data-beloworigin="true" data-activates='dropdown1'>
                <i className="material-icons black-icon">more_vert</i>
              </a>
            </li>

          </ul>

        </div>

        <ul id='dropdown1' className='dropdown-content'>
          <li><a href="#!">Log out</a></li>
        </ul> 

        <ul id='dropdown2' className='dropdown-content' data-constrainwidth="false">
          <AddCardContainer />
        </ul>
        
        { this.state.displayAddBar ? 
          <AddCardContainer /> : <span></span> }
      </nav>
    )
  }
};

export default TopBar;
