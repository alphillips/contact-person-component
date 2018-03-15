"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _checkbox = require("@react-ag-components/checkbox");

var _checkbox2 = _interopRequireDefault(_checkbox);

var _MuiThemeProvider = require("material-ui/styles/MuiThemeProvider");

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _RadioButton = require("material-ui/RadioButton");

var _radiobutton = require("@react-ag-components/radiobutton");

var _radiobutton2 = _interopRequireDefault(_radiobutton);

var _emailInput = require("@react-ag-components/email-input");

var _emailInput2 = _interopRequireDefault(_emailInput);

var _input = require("@react-ag-components/input");

var _input2 = _interopRequireDefault(_input);

var _address = require("@react-ag-components/address");

var _address2 = _interopRequireDefault(_address);

var _SelectField = require("material-ui/SelectField");

var _SelectField2 = _interopRequireDefault(_SelectField);

var _Card = require("material-ui/Card");

var _MenuItem = require("material-ui/MenuItem");

var _MenuItem2 = _interopRequireDefault(_MenuItem);

require("./contactperson.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contactPersonOptions = [{ value: "ME", label: "I am the contact person" }, { value: "OTHERCLIENT", label: "Someone else is the contact person" }];

var ContactPerson = function (_React$Component) {
  _inherits(ContactPerson, _React$Component);

  function ContactPerson(props) {
    var _this$state;

    _classCallCheck(this, ContactPerson);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.componentWillMount = function () {
      if (!_this.state.screenRegistration) {
        _this.setState(function (prevState, props) {
          return {
            contactPersonCode: _this.state.contactPerson.currentUserIsContactPerson === "false" ? "OTHERCLIENT" : "ME"
          };
        });
        if (JSON.stringify(_this.state.contactPerson.otherClientDetails) !== "{}") {
          _this.setState(function (prevState, props) {
            return {
              linkContactPerson: "LINK",
              foundClient: true,
              newSearch: false,
              clientId: _this.state.contactPerson.otherClientDetails.clientId,
              clientEmail: _this.state.contactPerson.otherClientDetails.clientEmail,
              searchEmailKeyword: _this.state.contactPerson.otherClientDetails.clientEmail,
              personDetail: _this.state.contactPerson.otherClientDetails.personDetails,
              foundContactFirstName: _this.state.contactPerson.otherClientDetails.personDetails.firstName
            };
          });
        }
        if (JSON.stringify(_this.state.contactPerson.otherPersonDetails) !== "{}") {
          _this.setState(function (prevState, props) {
            return {
              showManualClientEntry: true,
              foundClient: false,
              newSearch: false,
              contactFirstName: _this.state.contactPerson.otherPersonDetails.firstName,
              contactLastName: _this.state.contactPerson.otherPersonDetails.lastName,
              contactEmail: _this.state.contactPerson.otherPersonDetails.email,
              searchEmailKeyword: _this.state.contactPerson.otherPersonDetails.email,
              contactPhone: _this.state.contactPerson.otherPersonDetails.phone,
              contactMobile: _this.state.contactPerson.otherPersonDetails.mobile,
              contactPersonAddress: _this.state.contactPerson.otherPersonDetails.postalAddress
            };
          });
        }
      }
    };

    _this.setContactPersonCode = function (event) {
      var contactPersonCode = event.target.value;
      _this.setState(function (prevState, props) {
        return {
          contactPersonCode: contactPersonCode,
          searchEmailKeyword: "",
          foundClient: false,
          showManualClientEntry: false,
          linkContactPerson: "",
          showVerifyButton: contactPersonCode === "OTHERCLIENT" ? true : false,
          newSearch: true
        };
      });
      {
        _this.props.markDirty !== undefined && _this.props.markDirty("contactPersonCode", contactPersonCode);
      }
    };

    _this.linkContactPerson = function (e) {
      var linkContactPersonCode = e.target.value;
      _this.setState(function (prevState, props) {
        return {
          linkContactPerson: linkContactPersonCode
        };
      });
    };

    _this.isValidEmail = function (value) {
      return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
      );
    };

    _this.triggerFindClientContactPerson = function () {
      _this.setState(function (prevState, props) {
        return {
          showVerifyButton: false,
          newSearch: true
        };
      });
      if (JSON.stringify(_this.state.foundClientDetail) !== "{}") {
        // send to api
        _this.setState(function (prevState, props) {
          return {
            contactFirstName: _this.state.foundClientDetail.firstName,
            foundContactFirstName: _this.state.foundClientDetail.firstName,
            contactEmail: _this.isValidEmail(_this.state.searchEmailKeyword) ? _this.state.searchEmailKeyword : "",
            foundClient: true,
            showManualClientEntry: false
          };
        });
      } else {
        _this.setState(function (prevState, props) {
          return {
            foundClient: false,
            showManualClientEntry: true
          };
        });
      }
    };

    _this.updateSearchKeyword = function () {
      return function (value) {
        _this.setState(function (prevState, props) {
          return {
            searchEmailKeyword: value,
            foundClient: false,
            showVerifyButton: true,
            newSearch: true
          };
        });
      };
    };

    _this.onChange = function (field) {
      return function (value) {
        _this.setState(function (prevState, props) {
          var _ref;

          return _ref = {}, _ref[field] = value, _ref;
        });
        {
          _this.props.markDirty !== undefined && _this.props.markDirty(field, value);
        }
      };
    };

    _this.getDetails = function () {
      var person = {};
      person.contactPersonCode = _this.state.contactPersonCode;
      if (_this.state.contactPersonCode === 'ME') {
        person.currentUserIsContactPerson = true;
      } else {
        person.currentUserIsContactPerson = false;
        person.firstName = _this.state.contactFirstName;
        person.lastName = _this.state.contactLastName;

        person.email = _this.state.contactEmail;
        person.phone = _this.state.contactPhone;
        person.postalAddress = _this.state.contactPersonAddress;
      }
      return person;
    };

    _this.state = (_this$state = {
      contactPerson: props.contactPerson,
      contactPersonCode: "",
      searchTypeCode: ""
    }, _this$state["contactPerson"] = props.contactPerson || {}, _this$state.clientEmail = "", _this$state.searchEmailKeyword = "", _this$state.foundClient = false, _this$state.foundContactFirstName = "", _this$state.linkContactPerson = "", _this$state.changedData = true, _this$state.showVerifyButton = false, _this$state.foundClientDetail = { "firstName": "Cindy" }, _this$state);
    return _this;
  }

  ContactPerson.prototype.render = function render() {
    var checkStyle = {
      marginTop: "1em",
      color: "#999"
    };

    var checkLabelStyle = {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
    };

    var selectFieldStyle = {
      width: "100%",
      'color': '#999'
    };

    return _react2.default.createElement(
      "div",
      { className: "contact-person-component" },
      _react2.default.createElement(
        "h3",
        null,
        "Contact Person"
      ),
      !window.IS_STAFF && _react2.default.createElement(
        _MuiThemeProvider2.default,
        null,
        _react2.default.createElement(
          _RadioButton.RadioButtonGroup,
          {
            name: "contactPersonMode",
            defaultSelected: this.state.contactPersonCode,
            onChange: this.setContactPersonCode,
            valueSelected: this.state.contactPersonCode
          },
          !window.IS_STAFF && _react2.default.createElement(_radiobutton2.default, {
            value: "ME",
            label: "I am the contact person",
            style: checkStyle,
            labelStyle: checkLabelStyle,
            name: "radio-contactPersonMode"
          }),
          _react2.default.createElement(_radiobutton2.default, {
            value: "OTHERCLIENT",
            label: "Someone else is the contact person",
            style: checkStyle,
            labelStyle: checkLabelStyle,
            name: "radio-contactPersonMode"
          })
        )
      ),
      (this.state.contactPersonCode === "OTHERCLIENT" || window.IS_STAFF) && _react2.default.createElement(
        "div",
        { className: "other-client-container" },
        _react2.default.createElement(
          _MuiThemeProvider2.default,
          null,
          _react2.default.createElement(_input2.default, {
            label: "Contact Person Email or Client ID",
            id: "search",
            value: this.state.searchEmailKeyword,
            onChange: this.updateSearchKeyword(),
            placeholder: "Client Email"
          })
        ),
        this.state.showVerifyButton && _react2.default.createElement(
          "button",
          { className: "uikit-btn main-btn search-button", onClick: this.triggerFindClientContactPerson },
          "Search for existing client"
        ),
        this.state.foundClient && _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            "p",
            { className: "info-text" },
            this.state.newSearch && "Existing client has been found. ",
            " Update email address or client id to change contact person."
          ),
          _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
              _MuiThemeProvider2.default,
              null,
              _react2.default.createElement(
                _RadioButton.RadioButtonGroup,
                {
                  name: "linkContactPersonMode",
                  defaultSelected: this.state.linkContactPerson,
                  onChange: this.linkContactPerson,
                  valueSelected: this.state.linkContactPerson
                },
                !window.IS_STAFF && _react2.default.createElement(_radiobutton2.default, {
                  value: "LINK",
                  label: this.state.newSearch ? "Use this existing client. '" + this.state.foundContactFirstName + "' as the contact person." : this.state.foundContactFirstName + " is the contact person.",
                  style: checkStyle,
                  labelStyle: checkLabelStyle,
                  name: "radio-linkContactPerson"
                }),
                _react2.default.createElement(_radiobutton2.default, {
                  value: "NOTLINK",
                  label: "Don't link to this account, enter details manually.",
                  style: checkStyle,
                  labelStyle: checkLabelStyle,
                  name: "radio-linkContactPerson"
                })
              )
            )
          )
        )
      ),
      (this.state.showManualClientEntry || this.state.linkContactPerson === "NOTLINK") && !this.state.showVerifyButton && _react2.default.createElement(
        _MuiThemeProvider2.default,
        null,
        _react2.default.createElement(
          "div",
          null,
          !this.state.foundClient && _react2.default.createElement(
            "p",
            { className: "info-text" },
            this.state.newSearch && "There is no client match. ",
            " Update email address or client id to change contact person."
          ),
          _react2.default.createElement(
            "h3",
            null,
            "Detail of Contact Person"
          ),
          _react2.default.createElement(
            "div",
            { className: "half-area" },
            _react2.default.createElement(_input2.default, {
              label: "First name",
              id: "contact-name",
              value: this.state.contactFirstName,
              onChange: this.onChange("contactFirstName"),
              required: true
            }),
            _react2.default.createElement(_input2.default, {
              label: "Last name",
              id: "contact-name",
              value: this.state.contactLastName,
              onChange: this.onChange("contactLastName"),
              required: true
            }),
            _react2.default.createElement(_emailInput2.default, {
              label: "Email",
              id: "contact-email",
              value: this.state.contactEmail,
              onChange: this.onChange("contactEmail"),
              required: true
            }),
            _react2.default.createElement(_input2.default, {
              label: "Phone",
              id: "contact-phone",
              value: this.state.contactPhone,
              onChange: this.onChange("contactPhone"),
              required: true
            })
          ),
          _react2.default.createElement(_address2.default, {
            label: "Postal address",
            value: this.state.contactPersonAddress,
            onChange: this.onChange("contactPersonAddress")
          })
        )
      ),
      !this.state.showVerifyButton && _react2.default.createElement(
        "button",
        { className: "uikit-btn main-btn search-button", onClick: this.triggerFindClientContactPerson },
        "Save"
      )
    );
  };

  return ContactPerson;
}(_react2.default.Component);

exports.default = ContactPerson;
module.exports = exports["default"];