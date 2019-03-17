var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";

import Checkbox from "@react-ag-components/checkbox";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { RadioButtonGroup } from "material-ui/RadioButton";
import RadioButton from '@react-ag-components/radiobutton';
import EmailInput from '@react-ag-components/email-input';
import Input from "@react-ag-components/input";
import Address from "@react-ag-components/address";
import SelectField from "material-ui/SelectField";
import Messages from "@react-ag-components/messages";
import * as api from "./api";

import "./contactperson.css";

var contactPersonOptions = [{ value: "ME", label: "I am the contact person" }, { value: "OTHERCLIENT", label: "Someone else is the contact person" }];

var ContactPerson = function (_React$Component) {
  _inherits(ContactPerson, _React$Component);

  function ContactPerson(props) {
    _classCallCheck(this, ContactPerson);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.componentWillMount = function () {
      var errMsg = _this.triggerErrMsg();
      var noError = _this.isBlank(errMsg);
      var contactPersonDoneStatus = true;
      if (!_this.isBlank(_this.state.contactPerson)) {
        if (_this.state.contactIsMe) {
          _this.setState(function (prevState, props) {
            return {
              contactPersonCode: "ME",
              contactIsMe: true
            };
          });
        } else {
          var found = _this.state.contactPerson && _this.state.contactPerson.email;
          if (_this.state.contactPersonIsLINK) {
            _this.setState(function (prevState, props) {
              return {
                linkContactPersonCode: "LINK",
                contactPersonCode: "OTHERCLIENT",
                foundClient: found,
                showVerifyButton: !found,
                newSearch: false,
                personDetail: _this.state.contactPerson.otherClientDetails.personDetails,
                foundContactFirstName: _this.state.contactPerson.otherClientDetails.personDetails.firstName,
                contactPersonDoneStatus: contactPersonDoneStatus
              };
            });
            _this.props.contactPersonDoneStatus(contactPersonDoneStatus);
          } else {
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
                contactPersonDoneStatus: contactPersonDoneStatus
              };
            });
            _this.props.contactPersonDoneStatus(contactPersonDoneStatus);
          }
        }
      } else {
        contactPersonDoneStatus = false;
        _this.setState(function (prevState, props) {
          return {
            contactPersonCode: "ME",
            contactIsMe: true,
            foundClient: false,
            showVerifyButton: window.IS_STAFF ? true : false,
            newSearch: true,
            contactPersonDoneStatus: contactPersonDoneStatus,
            searchEmailKeyword: null,
            contactLastName: null
          };
        });
        _this.props.contactPersonDoneStatus(contactPersonDoneStatus);
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

    _this.isBlank = function (val) {
      var isBlank = false;
      // catch null and undefined
      if (!val || JSON.stringify(val) === "{}") {
        isBlank = true;
      } else {
        if (typeof val === "string") {
          if (val.trim() == "" || val === "undefined") {
            isBlank = true;
          }
        }
        if ((typeof val === "undefined" ? "undefined" : _typeof(val)) === "object") {
          if (Object.keys(val).length === 0) {
            isBlank = true;
          }
        }
      }
      return isBlank;
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
      _this.errObj = {};
      _this.errObj.type = "error";
      _this.errObj.msg = "";

      _this.props.contactPersonMsg(_this.errObj);

      _this.props.contactPersonDoneStatus(contactPersonDoneStatus);
    };

    _this.linkContactPerson = function (e) {
      var linkContactPersonCode = e.target.value;
      var contactPersonDoneStatus = contactPersonDoneStatus;
      _this.setState(function (prevState, props) {
        return {
          linkContactPersonCode: linkContactPersonCode,
          contactPersonDoneStatus: false,
          newSearch: true
        };
      });
      _this.props.contactPersonDoneStatus(contactPersonDoneStatus);
    };

    _this.isValidEmail = function (value) {
      return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
      );
    };

    _this.triggerFindClientContactPerson = function (keyword) {

      if (!_this.isBlank(keyword)) {
        var type = void 0;
        var id = void 0;
        if (_this.isValidEmail(keyword)) {
          type = "email";
        } else {
          type = "client-id";
        }
        id = keyword;

        _this.errObj = {};
        _this.errObj.type = "error";
        _this.errObj.msg = "";

        _this.props.contactPersonMsg(_this.errObj);

        _this.setState(function (prevState, props) {
          return {
            showVerifyButton: false,
            newSearch: true
          };
        });

        var URL_BASE = window.IS_STAFF ? '/partyas-rest/internal/api/v1/client/' : '/partyas-rest/external/api/v1/client/';

        fetch(URL_BASE + type + "/" + id, { credentials: 'same-origin' }).then(function (response) {
          if (response.status === 200) {

            response.text().then(function (data) {
              var parsedData = JSON.parse(data);

              if (parsedData.firstName !== null) {

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
          } else {
            _this.errObj = {};
            _this.errObj.type = "error";
            _this.errObj.msg = "There was an error with the server";

            _this.props.contactPersonMsg(_this.errObj);

            _this.setState(function (prevState, props) {
              return {
                showVerifyButton: true,
                newSearch: true
              };
            });
          }
        });
      } else {
        _this.errObj = {};
        _this.errObj.type = "error";
        _this.errObj.msg = "Please provide Contact person email or Client ID";

        _this.props.contactPersonMsg(_this.errObj);

        _this.setState(function (prevState, props) {
          return {
            showVerifyButton: true,
            newSearch: true
          };
        });
      }
    };

    _this.handleClientContactPersonContinue = function () {
      _this.triggerErrMsg();

      if (_this.state.linkContactPersonCode && _this.state.linkContactPersonCode === "NOTLINK") {
        if (_this.isBlank(_this.state.contactFirstName) || _this.isBlank(_this.state.contactLastName) || _this.isBlank(_this.state.contactEmail) || !_this.isValidEmail(_this.state.contactEmail)) {} else {
          var contactPersonDoneStatus = true;
          _this.setState(function (prevState, props) {
            return {
              contactPersonDoneStatus: contactPersonDoneStatus,
              newSearch: false
            };
          });
          _this.props.contactPersonDoneStatus(contactPersonDoneStatus);
        }
      } else {
        var _contactPersonDoneStatus = true;
        _this.setState(function (prevState, props) {
          return {
            contactPersonDoneStatus: _contactPersonDoneStatus,
            newSearch: false
          };
        });
        _this.props.contactPersonDoneStatus(_contactPersonDoneStatus);
      }

      _this.props.contactPersonMsg(_this.errObj);

      if (_this.state.standAlonePage) {
        if (_this.errObj.msg === "") {
          _this.props.handleClientContactPersonSave();
        }
      }
    };

    _this.updateSearchKeyword = function () {
      return function (value) {
        var contactPersonDoneStatus = false;
        _this.setState(function (prevState, props) {
          return {
            error: "",
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
        _this.setState(function (prevState, props) {
          var _ref;

          return _ref = {}, _ref[field] = value, _ref;
        });
      };
    };

    _this.triggerErrMsg = function () {
      _this.errObj = {};
      _this.errObj.type = "error";
      _this.errObj.msg = "";

      var errMsg = "";

      if (_this.state.contactPersonCode === "OTHERCLIENT") {
        if (_this.isBlank(_this.state.searchEmailKeyword)) {
          errMsg = "Please provide Contact person email or Client ID";
        }
        if (_this.state.linkContactPersonCode && _this.state.linkContactPersonCode === "NOTLINK") {
          if (_this.isBlank(_this.state.contactFirstName) || _this.isBlank(_this.state.contactLastName) || _this.isBlank(_this.state.contactEmail) || !_this.isValidEmail(_this.state.contactEmail)) {
            if (_this.isBlank(_this.state.contactFirstName)) {
              errMsg = "Contact first name cannot be blank";
            }
            if (_this.isBlank(_this.state.contactLastName)) {
              errMsg = "Contact last name cannot be blank";
            }
            if (_this.isBlank(_this.state.contactEmail)) {
              errMsg = "Contact email cannot be blank";
            }
            if (!_this.isValidEmail(_this.state.contactEmail)) {
              errMsg = "Contact email needs to be a valid email";
            }
          }
        }
      } else {
        errMsg = "";
      }
      _this.errObj.msg = errMsg;
    };

    _this.getErrorObj = function () {
      _this.errObj = {};
      _this.errObj.type = "error";
      _this.errObj.msg = "";

      _this.triggerErrMsg();
      return _this.errObj;
    };

    _this.getDetails = function () {
      var person = {};
      person.otherClientDetails = null;
      person.otherPersonDetails = null;
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
          person.otherPersonDetails.firstName = _this.state.contactFirstName, person.otherPersonDetails.lastName = _this.state.contactLastName, person.otherPersonDetails.phone = _this.state.contactPhone, person.otherPersonDetails.postalAddress = _this.state.contactPersonAddress, person.otherPersonDetails.email = _this.state.contactEmail;
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
      label: props.label || "Contact Person",
      contactPerson: props.contactPerson,
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
      newSearch: !props.contactPerson,
      contactPersonDoneStatus: props.contactPerson && true,
      standAlonePage: props.standAlonePage || false,
      standAloneLabel: props.standAloneLabel || "Save",
      hasChanged: false,
      notShowHeading: props.notShowHeading || false
    };
    _this.errObj = {};
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

    return React.createElement(
      "div",
      { className: "contact-person-component" },
      this.state.standAlonePage && React.createElement(Messages, {
        success: this.state.success,
        error: this.state.error,
        info: this.state.info
      }),
      !this.state.notShowHeading && React.createElement(
        "h3",
        null,
        this.state.label
      ),
      !window.IS_STAFF && React.createElement(
        MuiThemeProvider,
        null,
        React.createElement(
          RadioButtonGroup,
          {
            name: "contactPersonMode",
            defaultSelected: this.state.contactPersonCode,
            onChange: this.setContactPersonCode,
            valueSelected: this.state.contactPersonCode
          },
          !window.IS_STAFF && React.createElement(RadioButton, {
            value: "ME",
            label: "I am the contact person",
            style: checkStyle,
            labelStyle: checkLabelStyle,
            name: "radio-contactPersonMode"
          }),
          React.createElement(RadioButton, {
            value: "OTHERCLIENT",
            label: "Someone else is the contact person",
            style: checkStyle,
            labelStyle: checkLabelStyle,
            name: "radio-contactPersonMode"
          })
        )
      ),
      (this.state.contactPersonCode === "OTHERCLIENT" || window.IS_STAFF) && React.createElement(
        "div",
        { className: "other-client-container" },
        React.createElement(
          MuiThemeProvider,
          null,
          React.createElement(Input, {
            label: "Contact person email or Client ID",
            id: "search",
            value: this.state.searchEmailKeyword,
            onChange: this.updateSearchKeyword(),
            placeholder: "Client Email"
          })
        ),
        this.state.showVerifyButton && React.createElement(
          "button",
          { className: "uikit-btn uikit-btn--tertiary search-button", onClick: this.triggerFindClientContactPerson.bind(this, this.state.searchEmailKeyword) },
          "Search for existing client"
        ),
        this.state.foundClient && React.createElement(
          "div",
          null,
          React.createElement(
            "p",
            { className: "info-text" },
            this.state.newSearch && "Existing client has been found. ",
            " Update email address or client id to change contact person."
          ),
          React.createElement(
            "div",
            null,
            React.createElement(
              MuiThemeProvider,
              null,
              React.createElement(
                RadioButtonGroup,
                {
                  name: "linkContactPersonMode",
                  defaultSelected: this.state.linkContactPersonCode,
                  onChange: this.linkContactPerson,
                  valueSelected: this.state.linkContactPersonCode
                },
                React.createElement(RadioButton, {
                  value: "LINK",
                  label: this.state.newSearch ? "Use this existing client. '" + this.state.foundContactFirstName + "' as the contact person." : this.state.foundContactFirstName + " is the contact person.",
                  style: checkStyle,
                  labelStyle: checkLabelStyle,
                  name: "radio-linkContactPerson"
                }),
                React.createElement(RadioButton, {
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
      (this.state.showManualClientEntry || this.state.linkContactPersonCode === "NOTLINK") && !this.state.showVerifyButton && React.createElement(
        MuiThemeProvider,
        null,
        React.createElement(
          "div",
          null,
          !this.state.foundClient && React.createElement(
            "p",
            { className: "info-text" },
            this.state.newSearch && "There is no client match. ",
            " Update email address or client id to change contact person."
          ),
          React.createElement(
            "h3",
            null,
            "Detail of Contact Person"
          ),
          React.createElement(
            "div",
            { className: "half-area" },
            React.createElement(Input, {
              label: "First name",
              id: "contact-name",
              value: this.state.contactFirstName,
              onChange: this.onChange("contactFirstName"),
              required: true
            }),
            React.createElement(Input, {
              label: "Last name",
              id: "contact-name",
              value: this.state.contactLastName,
              onChange: this.onChange("contactLastName"),
              required: true
            }),
            React.createElement(EmailInput, {
              label: "Email",
              id: "contact-email",
              value: this.state.contactEmail,
              onChange: this.onChange("contactEmail"),
              required: true
            }),
            React.createElement(Input, {
              label: "Phone (if known)",
              id: "contact-phone",
              value: this.state.contactPhone,
              onChange: this.onChange("contactPhone")
            })
          ),
          React.createElement(Address, {
            label: "Postal address (if known)",
            value: this.state.contactPersonAddress,
            onChange: this.onChange("contactPersonAddress")
          })
        )
      ),
      !this.state.showVerifyButton && (!this.state.contactPersonDoneStatus || this.state.newSearch) && !this.state.standAlonePage && React.createElement(
        "button",
        { className: "uikit-btn uikit-btn--tertiary search-button", onClick: this.handleClientContactPersonContinue },
        "Continue"
      ),
      !this.state.showVerifyButton && this.state.standAlonePage && React.createElement(
        "button",
        { className: "uikit-btn main-btn search-button", onClick: this.handleClientContactPersonContinue },
        this.state.standAloneLabel
      )
    );
  };

  return ContactPerson;
}(React.Component);

export default ContactPerson;