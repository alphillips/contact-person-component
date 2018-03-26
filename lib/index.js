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

var _messages = require("@react-ag-components/messages");

var _messages2 = _interopRequireDefault(_messages);

var _api = require("./api");

var api = _interopRequireWildcard(_api);

require("./contactperson.css");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contactPersonOptions = [{ value: "ME", label: "I am the contact person" }, { value: "OTHERCLIENT", label: "Someone else is the contact person" }];

var ContactPerson = function (_React$Component) {
  _inherits(ContactPerson, _React$Component);

  function ContactPerson(props) {
    _classCallCheck(this, ContactPerson);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.componentWillMount = function () {
      if (_this.state.contactPerson) {
        if (_this.state.contactIsMe) {
          _this.setState(function (prevState, props) {
            return {
              contactPersonCode: "ME",
              contactIsMe: true
            };
          });
        } else {
          if (_this.state.contactPersonIsLINK) {
            var contactPersonDoneStatus = true;
            _this.setState(function (prevState, props) {
              return {
                linkContactPersonCode: "LINK",
                contactPersonCode: "OTHERCLIENT",
                foundClient: true,
                newSearch: false,
                personDetail: _this.state.contactPerson.otherClientDetails.personDetails,
                foundContactFirstName: _this.state.contactPerson.otherClientDetails.personDetails.firstName,
                contactPersonDoneStatus: contactPersonDoneStatus
              };
            });
            _this.props.contactPersonDoneStatus(contactPersonDoneStatus);
          } else {
            var _contactPersonDoneStatus = true;
            _this.setState(function (prevState, props) {
              return {
                linkContactPersonCode: "NOTLINK",
                contactPersonCode: "OTHERCLIENT",
                showManualClientEntry: true,
                foundClient: false,
                newSearch: false,
                contactFirstName: _this.state.contactPerson.otherPersonDetails.firstName,
                contactLastName: _this.state.contactPerson.otherPersonDetails.lastName,
                contactPhone: _this.state.contactPerson.otherPersonDetails.phone,
                contactPersonAddress: _this.state.contactPerson.otherPersonDetails.postalAddress,
                contactPersonDoneStatus: _contactPersonDoneStatus
              };
            });
            _this.props.contactPersonDoneStatus(_contactPersonDoneStatus);
          }
        }
      } else {
        var _contactPersonDoneStatus2 = false;
        _this.setState(function (prevState, props) {
          return {
            contactPersonCode: "ME",
            contactIsMe: true,
            foundClient: false,
            showVerifyButton: window.IS_STAFF ? true : false,
            newSearch: true,
            contactPersonDoneStatus: _contactPersonDoneStatus2,
            searchEmailKeyword: null,
            contactLastName: null
          };
        });
        _this.props.contactPersonDoneStatus(_contactPersonDoneStatus2);
        if (window.IS_STAFF) {
          _this.setState(function (prevState, props) {
            return {
              contactPersonCode: "OTHERCLIENT",
              contactIsMe: false
            };
          });
        }
      }
    };

    _this.setContactPersonCode = function (event) {
      var contactPersonCode = event.target.value;
      var contactPersonDoneStatus = false;
      _this.setState(function (prevState, props) {
        return {
          contactPersonCode: contactPersonCode,
          contactIsMe: contactPersonCode === "ME" ? true : false,
          linkContactPersonCode: contactPersonCode === "ME" ? "" : "LINK",
          searchEmailKeyword: null,
          foundClient: false,
          showManualClientEntry: false,
          showVerifyButton: contactPersonCode === "OTHERCLIENT" ? true : false,
          newSearch: true,
          contactPersonDoneStatus: contactPersonDoneStatus
        };
      });
      _this.props.contactPersonDoneStatus(contactPersonDoneStatus);
    };

    _this.linkContactPerson = function (e) {
      var linkContactPersonCode = e.target.value;
      var contactPersonDoneStatus = contactPersonDoneStatus;
      _this.setState(function (prevState, props) {
        return {
          linkContactPersonCode: linkContactPersonCode,
          contactPersonDoneStatus: false
        };
      });
      _this.props.contactPersonDoneStatus(contactPersonDoneStatus);
    };

    _this.isValidEmail = function (value) {
      return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
      );
    };

    _this.triggerFindClientContactPerson = function (keyword) {
      _this.setState(function (prevState, props) {
        return {
          showVerifyButton: false,
          newSearch: true
        };
      });

      if (keyword !== null) {
        var type = void 0;
        var id = void 0;
        if (_this.isValidEmail(keyword)) {
          type = "email";
        } else {
          type = "client-id";
        }
        id = keyword;

        var errObj = {};
        errObj.type = "error";
        errObj.msg = "";

        _this.props.contactPersonMsg(errObj);

        var URL_BASE = window.IS_STAFF ? '/partyas-rest/internal/api/v1/client/' : '/partyas-rest/external/api/v1/client/';

        fetch(URL_BASE + type + "/" + id, { credentials: 'same-origin' }).then(function (response) {
          if (response.status === 200) {
            response.text().then(function (data) {
              var parsedData = JSON.parse(data);

              if (parsedData.firstName !== undefined) {

                var contactEmail = _this.isValidEmail(keyword) ? keyword : null;
                var contactId = null;

                if (contactEmail === null) {
                  contactId = keyword;
                }

                _this.setState(function (prevState, props) {
                  return {
                    contactPersonDetail: parsedData,
                    contactFirstName: parsedData.firstName,
                    foundContactFirstName: parsedData.firstName,
                    contactEmail: contactEmail,
                    contactId: contactId,
                    foundClient: true,
                    showManualClientEntry: false
                  };
                });
                {
                  !window.IS_STAFF && _this.setState(function (prevState, props) {
                    return {
                      foundContactFirstName: parsedData.firstName,
                      foundContactLastName: parsedData.lastName,
                      foundContactPhone: parsedData.phone
                    };
                  });
                }
              } else {
                _this.setState(function (prevState, props) {
                  return {
                    foundClient: false,
                    showManualClientEntry: true,
                    contactPersonCode: "OTHERCLIENT",
                    contactIsMe: false,
                    linkContactPersonCode: "NOTLINK"
                  };
                });
              }
            });
          }
        });
      } else {
        var _errObj = {};
        _errObj.type = "error";
        _errObj.msg = "Please provide Contact person email or Client ID";

        _this.props.contactPersonMsg(_errObj);

        _this.setState(function (prevState, props) {
          return {
            showVerifyButton: true,
            newSearch: true
          };
        });
      }
    };

    _this.handleClientContactPersonContinue = function () {
      _this.setState(function (prevState, props) {
        return {
          newSearch: false
        };
      });
      var errObj = {};
      errObj.type = "error";
      errObj.msg = "";

      _this.props.contactPersonMsg(errObj);

      if (_this.state.linkContactPersonCode && _this.state.linkContactPersonCode === "NOTLINK") {
        if (_this.state.contactFirstName === "" || _this.state.contactLastName === null || _this.state.contactEmail === "" || !_this.isValidEmail(_this.state.contactEmail)) {

          var _errObj2 = {};
          _errObj2.type = "error";
          _errObj2.msg = "Please complete Contact Person details";

          _this.props.contactPersonMsg(_errObj2);
        } else {
          var contactPersonDoneStatus = true;
          _this.setState(function (prevState, props) {
            return {
              contactPersonDoneStatus: contactPersonDoneStatus
            };
          });
          _this.props.contactPersonDoneStatus(contactPersonDoneStatus);

          var _errObj3 = {};
          _errObj3.type = "error";
          _errObj3.msg = "";

          _this.props.contactPersonMsg(_errObj3);
        }
      } else {
        var _contactPersonDoneStatus3 = true;
        _this.setState(function (prevState, props) {
          return {
            contactPersonDoneStatus: _contactPersonDoneStatus3
          };
        });
        _this.props.contactPersonDoneStatus(_contactPersonDoneStatus3);
      }
    };

    _this.handleClientContactPersonSave = function () {
      _this.props.handleClientContactPersonSave();
    };

    _this.updateSearchKeyword = function () {
      return function (value) {
        var contactPersonDoneStatus = false;
        _this.setState(function (prevState, props) {
          return {
            searchEmailKeyword: value,
            foundClient: false,
            showVerifyButton: true,
            newSearch: true,
            contactPersonDoneStatus: contactPersonDoneStatus
          };
        });
        _this.props.contactPersonDoneStatus(contactPersonDoneStatus);
      };
    };

    _this.onChange = function (field) {
      return function (value) {
        var contactPersonDoneStatus = false;
        _this.setState(function (prevState, props) {
          var _ref;

          return _ref = {}, _ref[field] = value, _ref.contactPersonDoneStatus = contactPersonDoneStatus, _ref;
        });
        _this.props.contactPersonDoneStatus(contactPersonDoneStatus);
      };
    };

    _this.getDetails = function () {
      var person = {};
      person.otherClientDetails = null;
      person.otherPersonDetails = null;
      person.contactPersonCode = _this.state.contactPersonCode;
      person.currentUserIsContactPerson = false;

      var searchID = void 0;

      if (_this.state.foundClient) {
        person.email = _this.isValidEmail(_this.state.searchEmailKeyword) ? _this.state.searchEmailKeyword : null;

        if (person.email === null) {
          searchID = _this.state.searchEmailKeyword;
        }
      } else {
        person.email = _this.state.contactEmail;
        searchID = null;
      }

      if (_this.state.contactPersonCode === 'ME') {
        person.currentUserIsContactPerson = true;
      } else {
        if (_this.state.linkContactPersonCode === "LINK") {
          person.otherClientDetails = {};
          person.otherClientDetails.clientId = searchID;
          person.otherClientDetails.personDetails = {};
          person.otherClientDetails.personDetails.firstName = _this.state.foundContactFirstName;
        } else {
          person.otherPersonDetails = {};
          person.otherPersonDetails.firstName = _this.state.contactFirstName, person.otherPersonDetails.lastName = _this.state.contactLastName, person.otherPersonDetails.phone = _this.state.contactPhone, person.otherPersonDetails.postalAddress = _this.state.contactPersonAddress;
        }
      }
      return person;
    };

    _this.contactPersonHasChanged = function () {
      var hasChanged = false;

      if (_this.state.contactIsMe) {
        hasChanged = _this.state.contactIsMe !== _this.state.contactPerson.currentUserIsContactPerson;
      } else {
        if (_this.state.linkContactPersonCode === "LINK") {
          hasChanged = _this.state.contactEmail !== _this.state.contactPerson.email;
        } else {
          hasChanged = _this.state.contactPerson.otherPersonDetails !== null ? _this.state.contactFirstName !== _this.state.contactPerson.otherPersonDetails.firstName : true || _this.state.contactLastName !== _this.state.contactPerson.otherPersonDetails.lastName || _this.state.contactEmail !== _this.state.contactPerson.email || _this.state.contactPhone !== _this.state.contactPerson.otherPersonDetails.phone || _this.state.contactPersonAddress !== _this.state.contactPerson.otherPersonDetails.postalAddress;
        }
      }
      return hasChanged;
    };

    _this.state = {
      contactPersonCode: window.IS_STAFF ? "OTHERCLIENT" : "ME",
      contactPerson: props.contactPerson || undefined,
      contactIsMe: props.contactPerson && props.contactPerson.currentUserIsContactPerson === true,
      contactPersonIsLINK: props.contactPerson && props.contactPerson.otherClientDetails !== null,
      linkContactPersonCode: "LINK",
      contactEmail: props.contactPerson && props.contactPerson.email,
      searchEmailKeyword: props.contactPerson !== undefined ? props.contactPerson.email : null,
      foundClient: false,
      foundContactFirstName: "",
      contactLastName: null,
      showVerifyButton: false,
      foundClientDetail: {},
      newSearch: true,
      standAlonePage: props.standAlonePage || false,
      hasChanged: false
    };
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
          { className: "uikit-btn uikit-btn--tertiary search-button", onClick: this.triggerFindClientContactPerson.bind(this, this.state.searchEmailKeyword) },
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
                  defaultSelected: this.state.linkContactPersonCode,
                  onChange: this.linkContactPerson,
                  valueSelected: this.state.linkContactPersonCode
                },
                _react2.default.createElement(_radiobutton2.default, {
                  value: "LINK",
                  label: this.state.newSearch ? "Use this existing client. '" + this.state.foundContactFirstName + "' as the contact person." : this.state.foundContactFirstName + " is the contact person.",
                  style: checkStyle,
                  labelStyle: checkLabelStyle,
                  name: "radio-linkContactPerson"
                }),
                _react2.default.createElement(_radiobutton2.default, {
                  value: "NOTLINK",
                  label: "Don't link to the existing client, enter details manually.",
                  style: checkStyle,
                  labelStyle: checkLabelStyle,
                  name: "radio-linkContactPerson"
                })
              )
            )
          )
        )
      ),
      (this.state.showManualClientEntry || this.state.linkContactPersonCode === "NOTLINK") && !this.state.showVerifyButton && _react2.default.createElement(
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
              label: "Phone (if known)",
              id: "contact-phone",
              value: this.state.contactPhone,
              onChange: this.onChange("contactPhone")
            })
          ),
          _react2.default.createElement(_address2.default, {
            label: "Postal address (if known)",
            value: this.state.contactPersonAddress,
            onChange: this.onChange("contactPersonAddress")
          })
        )
      ),
      !this.state.showVerifyButton && (this.state.newSearch || !this.state.contactPersonDoneStatus) && !this.state.standAlonePage && _react2.default.createElement(
        "button",
        { className: "uikit-btn uikit-btn--tertiary search-button", onClick: this.handleClientContactPersonContinue },
        "Continue"
      ),
      !this.state.showVerifyButton && this.state.standAlonePage && _react2.default.createElement(
        "button",
        { className: "uikit-btn main-btn search-button", onClick: this.handleClientContactPersonSave },
        "Save"
      )
    );
  };

  return ContactPerson;
}(_react2.default.Component);

exports.default = ContactPerson;
module.exports = exports["default"];