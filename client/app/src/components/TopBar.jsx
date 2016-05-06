import React from 'react';
import SearchContainer from '../containers/SearchContainer';

class TopBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displaySearchBar: false
    }
  }

  toggleSearchBar() {
    this.setState({
      displaySearchBar: !this.state.displaySearchBar
    });
    console.log(this.state.displaySearchBar);
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#!" className="brand-logo">Logo</a>

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

            <li><a href="badges.html"><i className="material-icons">view_module</i></a></li>
            <li><a href="collapsible.html"><i className="material-icons">refresh</i></a></li>
            <li><a href="mobile.html"><i className="material-icons">more_vert</i></a></li>
          </ul>
        </div>
      </nav>
    )
  }
};

export default TopBar;