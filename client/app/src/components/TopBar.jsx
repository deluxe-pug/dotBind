import React from 'react';
import SearchContainer from '../containers/SearchContainer';
import AddCardContainer from '../containers/AddCardContainer';

class TopBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displaySearchBar: false,
      displayAddBar: false
    }
  }

  toggleSearchBar() {
    this.setState({
      displaySearchBar: !this.state.displaySearchBar
    });
  }

  toggleAddBar() {
    this.setState({
      displayAddBar: !this.state.displayAddBar
    });
  }

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
                <i className="material-icons">library_add</i>

              </a>
            </li>

            <li><a href="badges.html"><i className="material-icons black-icon">view_module</i></a></li>
            <li><a href="collapsible.html"><i className="material-icons black-icon">refresh</i></a></li>
            <li><a href="mobile.html"><i className="material-icons black-icon">more_vert</i></a></li>
          </ul>
        </div>
        { this.state.displayAddBar ? 
          <AddCardContainer /> : <span></span> }
      </nav>
    )
  }
};

export default TopBar;
