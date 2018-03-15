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
      contactPerson: props.contactPerson,
      contactPersonCode: "",
      searchTypeCode: "",
      clientDetail: {"firstName":"Cindy"},
      searchEmailKeyword: "",
      foundClient: false,
      foundContactFirstName:"",
      linkContactPerson: ""
    };
  }

  componentWillMount = () => {
    if(this.state.contactPerson !== undefined) {
      this.setState((prevState, props) => ({
        contactPersonCode: (this.state.contactPerson.currentUserIsContactPerson === false) ? "OTHER" : "ME",
        currentUserIsContactPerson: this.state.contactPerson.currentUserIsContactPerson || true,
        contactPersonAddress: this.state.contactPerson.postalAddress || {},
        contactEmail: this.state.contactPerson.email || "",
        contactPhone: this.state.contactPerson.phone || "",
        contactFirstName: this.state.contactPerson.firstName || "",
        contactLastName: this.state.contactPerson.lastName || ""
      }))
    }
  }

  setContactPersonCode = (event) => {
    const contactPersonCode = event.target.value;
      this.setState((prevState, props) => ({
        contactPersonCode: contactPersonCode,
        searchEmailKeyword: "",
        foundClient: false,
        showManualClientEntry:false
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

  findClientContactPerson = () => {
    return value => {
      this.setState((prevState, props) => ({
        searchEmailKeyword: value
      }))
      if(this.isValidEmail(value)) {
        // send to api
        if(this.state.clientDetail.firstName !== "") {
          this.setState((prevState, props) => ({
            contactFirstName: this.state.clientDetail.firstName,
            foundContactFirstName: this.state.clientDetail.firstName,
            contactEmail: value,
            foundClient: true,
            showManualClientEntry: false
          }))
        } else {
          this.setState((prevState, props) => ({
            foundClient: false,
            showManualClientEntry: true
          }))
        }
      } else {
        this.setState((prevState, props) => ({
          foundClient: false,
          contactFirstName: ""
        }))
      }
    }
  }

  triggerFindClientContactPerson = () => {
    if(this.state.foundClient) {
      this.setState((prevState, props) => ({
        showManualClientEntry: false
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

  toggleManualClientEntry = () => {
    this.setState((prevState, props) => ({
      showManualClientEntry: !this.state.showManualClientEntry
    }))
  }

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
                label={"Contact Person Email"}
                id="search"
                value={this.state.searchEmailKeyword}
                onChange={this.findClientContactPerson()}
                placeholder={
                  "Client Email"
                }
              />
            </MuiThemeProvider>
            <button className="search-button" onClick={this.triggerFindClientContactPerson}>Search for existing client</button>

              {this.state.foundClient &&
                <div>
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
                              label={"Existing client has been found with this email address. link contact person to "+ this.state.foundContactFirstName + "."}
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
        {(this.state.showManualClientEntry && this.state.contactPersonCode === "OTHERCLIENT") || (this.state.linkContactPerson === "NOTLINK") &&(
          <MuiThemeProvider>
          <div>
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
      </div>
    );
  }
}
export default ContactPerson;
