function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import MenuSlide from 'react-burger-menu/lib/menus/slide';
import SearchBar from './SearchBar';
import { Link, hashHistory } from 'react-router';

import logo from './da-logo.svg';
import './header.css';
import './SearchBar/searchbar.css';
import './uikit.css';
import './application-side-menu.css';

var Header = function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header(props) {
    _classCallCheck(this, Header);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.onProfileClick = function (e) {
      // attach/remove event handler
      if (!_this.state.isProfileOpen) {
        document.addEventListener('click', _this.handleOutsideClickProfile, false);
      } else {
        document.removeEventListener('click', _this.handleOutsideClickProfile, false);
      }

      _this.setState(function (prevState, props) {
        return {
          isProfileOpen: !_this.state.isProfileOpen
        };
      });
      e.preventDefault();
    };

    _this.onHelpClick = function (e) {
      // attach/remove event handler
      if (!_this.state.isHelpOpen) {
        document.addEventListener('click', _this.handleOutsideClickHelp, false);
      } else {
        document.removeEventListener('click', _this.handleOutsideClickHelp, false);
      }

      _this.setState(function (prevState, props) {
        return {
          isHelpOpen: !_this.state.isHelpOpen
        };
      });
      e.preventDefault();
    };

    _this.handleOutsideClickProfile = function (e) {
      // ignore clicks on the component itself
      if (_this.node.contains(e.target)) {
        return;
      }
      _this.onProfileClick(e);
    };

    _this.handleOutsideClickHelp = function (e) {
      // ignore clicks on the component itself
      if (_this.node.contains(e.target)) {
        return;
      }
      _this.onHelpClick(e);
    };

    _this.onclick = function () {
      _this.setState(function (prevState, props) {
        return {
          isOpen: !_this.state.isOpen
        };
      });
    };

    _this.componentWillReceiveProps = function (nextProps) {
      _this.showMenuContext();
    };

    _this.showMenuContext = function () {
      try {
        // DOM manipulation for showing current manu item
        var links = document.querySelectorAll('nav[class="global-menu"] a');
        var link = document.querySelector('nav[class="global-menu"] a[href="' + document.location.hash + '"]');
        var i = void 0;
        if (links && link) {
          for (i = 0; i < links.length; i++) {
            links[i].className = '';
          }
          link.className = 'current';
        }
      } catch (e) {}
    };

    _this.state = {
      isOpen: false,
      isProfileOpen: false,
      isHelpOpen: false,
      inboxUrl: _this.props.inboxUrl || "/nexdoc/#/inbox"
    };
    _this.handleOutsideClickProfile = _this.handleOutsideClickProfile.bind(_this);
    _this.handleOutsideClickHelp = _this.handleOutsideClickHelp.bind(_this);
    _this.onHelpClick = _this.onHelpClick.bind(_this);
    _this.onProfileClick = _this.onProfileClick.bind(_this);
    _this.showInbox = _this.props.showInbox;
    return _this;
  }

  Header.prototype.componentDidMount = function componentDidMount() {
    this.showMenuContext();
  };

  Header.prototype.render = function render() {
    var _this2 = this;

    return React.createElement(
      'div',
      { className: window.IS_STAFF ? "staff-header header" : "header" },
      React.createElement(
        'div',
        { className: 'side-menu-container' },
        React.createElement(
          MenuSlide,
          { isOpen: this.state.isOpen, className: 'bm-menu', width: '50%', onClick: this.onclick },
          React.createElement(
            'div',
            { className: 'side-menu' },
            this.props.menu
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'top-menu-header' },
        React.createElement(
          'div',
          { className: 'top-links-wrapper' },
          React.createElement(
            'div',
            { className: 'top-links main-block' },
            React.createElement(
              'ul',
              null,
              React.createElement(
                'li',
                { className: 'home-portal' },
                window.IS_STAFF && React.createElement(
                  Link,
                  { to: '/', className: 'staff-home-link' },
                  'Home'
                ),
                !window.IS_STAFF && React.createElement(
                  'a',
                  { href: '/portal', className: 'staff-home-link' },
                  'Client portal'
                )
              ),
              React.createElement(
                'li',
                { className: 'header-app-name' },
                this.props.name
              ),
              React.createElement(
                'li',
                { className: 'autocomplete-li-link-search' },
                this.props.searchArray && React.createElement(SearchBar, {
                  searchArray: this.props.searchArray,
                  searchKey: this.props.searchKey,
                  searchDisplayAttributes: this.props.searchDisplayAttributes
                })
              ),
              React.createElement(
                'li',
                { className: 'header-app-inbox-container' },
                this.showInbox && React.createElement(
                  'a',
                  { href: this.state.inboxUrl, className: 'header-app-inbox' },
                  this.props.unreadCount > 0 && React.createElement(
                    'span',
                    { className: 'unread-count' },
                    this.props.unreadCount > 0 ? this.props.unreadCount : ''
                  )
                )
              ),
              React.createElement(
                'li',
                { className: 'header-app-help target-caret' },
                React.createElement(
                  'a',
                  { href: '#', className: 'target-help', onClick: this.onHelpClick.bind(this) },
                  React.createElement('span', null)
                )
              ),
              React.createElement(
                'li',
                { className: 'header-app-username target-caret' },
                React.createElement(
                  'a',
                  { href: '#', onClick: this.onProfileClick.bind(this) },
                  React.createElement(
                    'span',
                    { className: 'desktop-profile' },
                    this.props.userName
                  ),
                  React.createElement('span', { className: 'mobile-profile' })
                )
              )
            ),
            this.state.isProfileOpen && React.createElement(
              'div',
              { className: 'target-profile-content', ref: function ref(node) {
                  _this2.node = node;
                } },
              this.props.abn && React.createElement(
                'p',
                null,
                'ABN: ',
                this.props.abn
              ),
              this.props.logonId && React.createElement(
                'p',
                null,
                'Login ID: ',
                this.props.logonId
              ),
              this.props.orgName && React.createElement(
                'p',
                null,
                'Org Name: ',
                this.props.orgName
              ),
              this.props.otherInfo && this.props.otherInfo.map(function (info) {
                return React.createElement(
                  'p',
                  { key: info.label + info.value },
                  ' ',
                  info.label,
                  ': ',
                  info.value
                );
              }),
              React.createElement(
                'ul',
                null,
                React.createElement(
                  'li',
                  { className: 'logout-li-link-staff' },
                  React.createElement(
                    'a',
                    { href: '/auth/faces/logout/' },
                    'Log Out'
                  )
                )
              )
            ),
            this.state.isHelpOpen && React.createElement(
              'div',
              { className: 'target-help-content', ref: function ref(node) {
                  _this2.node = node;
                } },
              React.createElement(
                'ul',
                null,
                React.createElement(
                  'li',
                  { className: 'help-item' },
                  React.createElement(
                    'a',
                    { href: '#' },
                    'Help items'
                  )
                )
              )
            )
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'header-block' },
        React.createElement(
          'nav',
          { role: 'navigation', className: 'global-menu' },
          this.props.menu
        )
      )
    );
  };

  return Header;
}(React.Component);

export default Header;