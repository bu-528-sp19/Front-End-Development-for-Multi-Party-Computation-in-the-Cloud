import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Icon } from 'patternfly-react';
import { Collapse } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import Search from './components/Search/Search';
import './Navbar.css';
import LogoImg from '../../assets/img/chris-plugin-store_logo.png';


export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.onSigninClick = this.onSigninClick.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  onSigninClick() {
    const { store } = this.props;
    if (store.getState().isLoggedIn) {
      store.getState().isLoggedIn = '';
    }
  }

  toggleDropdown(e) {
    // only toggle the dropdown if the button is not active
    const isActive = e && e.target.className.indexOf('active') !== -1;
    if (!isActive) {
      this.setState(prevState => ({
        open: !prevState.open,
      }));
    }
  }

  closeDropdown() {
    this.setState(() => ({ open: false }));
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') this.toggleDropdown();
  }

  render() {
    const { store } = this.props;
    const newState = store.getState();
    this.state.isloggedIn = newState.isLoggedIn;
    const loginText = this.state.isloggedIn ? 'Sign out' : 'Sign in';
    const dashboardLink = this.state.isloggedIn ? (
      <li>
        <NavLink to="/dashboard" href="/dashboard">
          Dashboard
        </NavLink>
      </li>) : '';
    const dashboardDropdown = store.getState().isLoggedIn ? (
      <div className="navbar-btn-container">
        <NavLink
          to="/dashboard"
          href="/dashboard"
          className="navbar-dropdown-btn"
          onClick={this.toggleDropdown}
        >
          Dashboard
        </NavLink>
      </div>) : '';
    return (
      <header>
        <nav className="navbar navbar-pf-vertical navbar-default">
          <div className="navbar-row row">
            <div className="navbar-header">
              <NavLink
                to="/"
                href="/"
                className="navbar-brand navbar-logo"
                onClick={this.closeDropdown}
                tabIndex="0"
              >
                <img
                  className="navbar-logo-img"
                  src={LogoImg}
                  alt="ChRIS Plugin Store"
                />
              </NavLink>
              <Search className="navbar-search" location={this.props.location} />
              <div
                className="navbar-trigger"
                role="menuitem"
                tabIndex="0"
                onClick={this.toggleDropdown}
                onKeyPress={this.handleKeyPress}
              >
                <Icon name="bars" />
              </div>
            </div>
            <div className="navbar-collapse collapse">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <Link to="/signin" href="/signin" className="navbar-signin-btn-link">
                    <Button className="navbar-signin-btn" bsStyle="info" bsSize="large" onClick={this.onSigninClick}>
                      {loginText}
                    </Button>
                  </Link>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <NavLink to="/plugins" href="/plugins" className="navbar-plugins-btn">
                    Plugins
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/developers" href="/developers" className="navbar-developers-btn">
                    Developers
                  </NavLink>
                </li>
                {dashboardLink}
              </ul>
            </div>
          </div>
        </nav>
        <Collapse in={this.state.open} className="navbar-dropdown">
          <div className="navbar-dropdown-container">
            <div className="navbar-btn-container">
              <NavLink
                to="/plugins"
                href="/plugins"
                className="navbar-dropdown-btn"
                onClick={this.toggleDropdown}
              >
                Plugins
              </NavLink>
            </div>
            <div className="navbar-btn-container">
              <NavLink
                to="/developers"
                href="/developers"
                className="navbar-dropdown-btn"
                onClick={this.toggleDropdown}
              >
                Developers
              </NavLink>
            </div>
            {dashboardDropdown}
            <div className="navbar-btn-container">
              <Link to="/signin" href="/signin" className="navbar-signin-dropdown-btn-link">
                <Button className="navbar-signin-dropdown-btn" bsStyle="info" bsSize="large" onClick={this.onSigninClick}>
                  {loginText}
                </Button>
              </Link>
            </div>
          </div>
        </Collapse>
      </header>
    );
  }
}

Navbar.propTypes = {
  store: PropTypes.objectOf(PropTypes.object).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
};

Navbar.defaultProps = {
  location: {
    search: '',
  },
};

const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn,
});

export default connect(mapStateToProps)(Navbar);

