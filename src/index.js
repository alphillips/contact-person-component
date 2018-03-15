import React from "react";

import Checkbox from "@react-ag-components/checkbox"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import { RadioButtonGroup } from "material-ui/RadioButton"
import RadioButton from '@react-ag-components/radiobutton'
import EmailInput from '@react-ag-components/email-input'
import Input from "@react-ag-components/input";
import Address from "@react-ag-components/address";
import SelectField from "material-ui/SelectField";
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import MenuItem from 'material-ui/MenuItem';

import "./contactperson.css";

const contactPersonOptions = [
  { value: "ME", label: "I am the contact person" },
  { value: "OTHERCLIENT", label: "Someone else is the contact person" }
];

class ContactPerson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactPersonCode: "",
      searchTypeCode: "",
      contactPerson: props.contactPerson,
      clientEmail: "",
      searchEmailKeyword: "",
      foundClient: false,
      foundContactFirstName:"",
      linkContactPerson: "",
      changedData: true,
      showVerifyButton: false,
      foundClientDetail: {"firstName" : "Cindy"}
    };
  }

  componentWillMount = () => {
    if(this.state.contactPerson) {
      this.setState((prevState, props) => ({
        contactPersonCode: (this.state.contactPerson.currentUserIsContactPerson === "false") ? "OTHERCLIENT" : "ME",
      }))
      if(JSON.stringify(this.state.contactPerson.otherClientDetails) !== "{}") {
        this.setState((prevState, props) => ({
          linkContactPerson: "LINK",
          foundClient: true,
          newSearch: false,
          clientId: this.state.contactPerson.otherClientDetails.clientId,
          clientEmail: this.state.contactPerson.otherClientDetails.clientEmail,
          searchEmailKeyword: this.state.contactPerson.otherClientDetails.clientEmail,
          personDetail: this.state.contactPerson.otherClientDetails.personDetails,
          foundContactFirstName: this.state.contactPerson.otherClientDetails.personDetails.firstName
        }))
      }
      if(JSON.stringify(this.state.contactPerson.otherPersonDetails) !== "{}") {
        this.setState((prevState, props) => ({
          showManualClientEntry: true,
          foundClient: false,
          newSearch: false,
          contactFirstName: this.state.contactPerson.otherPersonDetails.firstName,
          contactLastName: this.state.contactPerson.otherPersonDetails.lastName,
          contactEmail: this.state.contactPerson.otherPersonDetails.email,
          searchEmailKeyword: this.state.contactPerson.otherPersonDetails.email,
          contactPhone: this.state.contactPerson.otherPersonDetails.phone,
          contactMobile: this.state.contactPerson.otherPersonDetails.mobile,
          contactPersonAddress: this.state.contactPerson.otherPersonDetails.postalAddress
        }))
      }
    }
  }

  setContactPersonCode = (event) => {
    const contactPersonCode = event.target.value;
    this.setState((prevState, props) => ({
      contactPersonCode: contactPersonCode,
      searchEmailKeyword: "",
      foundClient: false,
      showManualClientEntry:false,
      linkContactPerson: "",
      showVerifyButton: contactPersonCode === "OTHERCLIENT" ? true : false,
      newSearch: true
    }));
    {this.props.markDirty !== undefined &&
      this.props.markDirty("contactPersonCode", contactPersonCode)
    }
  };

  linkContactPerson = (e) => {
    const linkContactPersonCode = e.target.value;
    this.setState((prevState, props) => ({
      linkContactPerson: linkContactPersonCode
    }))
  }

  isValidEmail = (value) => {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value))
  }

  triggerFindClientContactPerson = () => {
    this.setState((prevState, props) => ({
      showVerifyButton: false,
      newSearch: true
    }))
    if(JSON.stringify(this.state.foundClientDetail) !== "{}") {
      // send to api
      this.setState((prevState, props) => ({
        contactFirstName: this.state.foundClientDetail.firstName,
        foundContactFirstName: this.state.foundClientDetail.firstName,
        contactEmail: this.isValidEmail(this.state.searchEmailKeyword) ? this.state.searchEmailKeyword : "",
        foundClient: true,
        showManualClientEntry: false
      }))
    } else {
      this.setState((prevState, props) => ({
        foundClient: false,
        showManualClientEntry: true
      }))
    }
  }

  updateSearchKeyword = () => {
    return value => {
      this.setState((prevState, props) => ({
        searchEmailKeyword: value,
        foundClient: false,
        showVerifyButton: true,
        newSearch: true
      }))
    }
  }

  onChange = field => {
    return value => {
      this.setState((prevState, props) => ({
        [field]: value
      }));
      {this.props.markDirty !== undefined &&
        this.props.markDirty(field, value)
      }
    };
  };

  getDetails = () => {
   let person = {}
   person.contactPersonCode = this.state.contactPersonCode
    if (this.state.contactPersonCode === 'ME') {
      person.currentUserIsContactPerson = true
    } else {
      person.currentUserIsContactPerson = false
      person.firstName = this.state.contactFirstName
      person.lastName = this.state.contactLastName

      person.email = this.state.contactEmail
      person.phone = this.state.contactPhone
      person.postalAddress = this.state.contactPersonAddress
    }
    return person
  }

  render() {
    const checkStyle = {
      marginTop: "1em",
      color: "#999"
    };

    const checkLabelStyle = {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
    };

    const selectFieldStyle = {
      width: "100%",
      'color':'#999'
    };

    return (
      <div className="contact-person-component">
        <h3>Contact Person</h3>
        {!window.IS_STAFF &&
          <MuiThemeProvider>

            <RadioButtonGroup
              name="contactPersonMode"
              defaultSelected={this.state.contactPersonCode}
              onChange={this.setContactPersonCode}
              valueSelected={this.state.contactPersonCode}
            >
              {!window.IS_STAFF &&
                <RadioButton
                  value="ME"
                  label="I am the contact person"
                  style={checkStyle}
                  labelStyle={checkLabelStyle}
                  name="radio-contactPersonMode"
                />
              }
              <RadioButton
                value="OTHERCLIENT"
                label="Someone else is the contact person"
                style={checkStyle}
                labelStyle={checkLabelStyle}
                name="radio-contactPersonMode"
              />

            </RadioButtonGroup>

          </MuiThemeProvider>
        }

        {(this.state.contactPersonCode === "OTHERCLIENT" || window.IS_STAFF) && (
          <div className="other-client-container">
            <MuiThemeProvider>
              <Input
                label={"Contact Person Email or Client ID"}
                id="search"
                value={this.state.searchEmailKeyword}
                onChange={this.updateSearchKeyword()}
                placeholder={
                  "Client Email"
                }
              />
            </MuiThemeProvider>

            {this.state.showVerifyButton &&
              <button className="uikit-btn main-btn search-button" onClick={this.triggerFindClientContactPerson}>Search for existing client</button>
            }

              {this.state.foundClient &&
                <div>
                  <p className="info-text">{this.state.newSearch && "Existing client has been found. "} Update email address or client id to change contact person.</p>
                    <div>
                      <MuiThemeProvider>
                        <RadioButtonGroup
                          name="linkContactPersonMode"
                          defaultSelected={this.state.linkContactPerson}
                          onChange={this.linkContactPerson}
                          valueSelected={this.state.linkContactPerson}
                        >
                          {!window.IS_STAFF &&
                            <RadioButton
                              value="LINK"
                              label={this.state.newSearch ? ("Use this existing client. '"  + this.state.foundContactFirstName  + "' as the contact person.") : (this.state.foundContactFirstName + " is the contact person.")}
                              style={checkStyle}
                              labelStyle={checkLabelStyle}
                              name="radio-linkContactPerson"
                            />
                          }
                          <RadioButton
                            value="NOTLINK"
                            label="Don't link to this account, enter details manually."
                            style={checkStyle}
                            labelStyle={checkLabelStyle}
                            name="radio-linkContactPerson"
                          />

                        </RadioButtonGroup>

                      </MuiThemeProvider>
                    </div>
                </div>
              }
          </div>
        )}
        {(this.state.showManualClientEntry  || (this.state.linkContactPerson === "NOTLINK")) && (!this.state.showVerifyButton) &&(
          <MuiThemeProvider>
          <div>
            {!this.state.foundClient &&
              <p className="info-text">{this.state.newSearch && "There is no client match. "} Update email address or client id to change contact person.</p>
            }
            <h3>Detail of Contact Person</h3>
            <div className="half-area">
              <Input
                label="First name"
                id="contact-name"
                value={this.state.contactFirstName}
                onChange={this.onChange("contactFirstName")}
                required={true}
              />
              <Input
                label="Last name"
                id="contact-name"
                value={this.state.contactLastName}
                onChange={this.onChange("contactLastName")}
                required={true}
              />

              <EmailInput
                label="Email"
                id="contact-email"
                value={this.state.contactEmail}
                onChange={this.onChange("contactEmail")}
                required={true}
              />

              <Input
                label="Phone"
                id="contact-phone"
                value={this.state.contactPhone}
                onChange={this.onChange("contactPhone")}
                required={true}
              />
            </div>

            <Address
              label="Postal address"
              value={this.state.contactPersonAddress}
              onChange={this.onChange("contactPersonAddress")}
            />
          </div>
        </MuiThemeProvider>
        )}

        {!this.state.showVerifyButton &&
          <button className="uikit-btn main-btn search-button" onClick={this.triggerFindClientContactPerson}>Save</button>
        }
      </div>
    );
  }
}
export default ContactPerson;
