'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAutosuggest = require('react-autosuggest');

var _reactAutosuggest2 = _interopRequireDefault(_reactAutosuggest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchBar = function (_React$Component) {
  _inherits(SearchBar, _React$Component);

  function SearchBar(props) {
    _classCallCheck(this, SearchBar);

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.getSuggestions = function (value) {
      var inputValue = value.trim().toLowerCase();
      var inputLength = inputValue.length;

      return inputLength === 0 ? [] : _this.props.searchArray.filter(function (obj) {
        return obj[_this.props.searchKey] !== null && obj[_this.props.searchKey].toLowerCase().indexOf(inputValue) > -1;
      });
    };

    _this.getSuggestionValue = function (suggestion) {
      return suggestion[_this.props.searchKey];
    };

    _this.renderSuggestion = function (suggestion) {
      return _react2.default.createElement(
        'a',
        { href: suggestion.link },
        _this.props.searchDisplayAttributes.map(function (attr) {
          return _react2.default.createElement(
            'span',
            { key: attr, className: 'search-bar-results-' + attr },
            suggestion[attr]
          );
        })
      );
    };

    _this.onChange = function (event, _ref) {
      var newValue = _ref.newValue;

      _this.setState({
        value: newValue
      });
    };

    _this.onSuggestionsFetchRequested = function (_ref2) {
      var value = _ref2.value;

      _this.setState({
        suggestions: _this.getSuggestions(value)
      });
    };

    _this.onSuggestionsClearRequested = function () {
      _this.setState({
        suggestions: []
      });
    };

    _this.state = {
      value: '',
      suggestions: []
    };
    return _this;
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.


  // Autosuggest will call this function every time you need to clear suggestions.


  SearchBar.prototype.render = function render() {
    var _state = this.state,
        value = _state.value,
        suggestions = _state.suggestions;

    // Autosuggest will pass through all these props to the input.

    var inputProps = {
      placeholder: 'Search...',
      value: value,
      onChange: this.onChange,
      type: 'search'
    };

    var renderInputComponent = function renderInputComponent(inputProps) {
      return _react2.default.createElement(
        'div',
        { className: 'autosuggestContainer' },
        _react2.default.createElement('input', inputProps),
        _react2.default.createElement('i', null)
      );
    };

    // Finally, render it!
    return _react2.default.createElement(_reactAutosuggest2.default, {
      suggestions: suggestions,
      onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.onSuggestionsClearRequested,
      getSuggestionValue: this.getSuggestionValue,
      renderSuggestion: this.renderSuggestion,
      inputProps: inputProps,
      renderInputComponent: renderInputComponent
    });
  };

  return SearchBar;
}(_react2.default.Component);

exports.default = SearchBar;
module.exports = exports['default'];