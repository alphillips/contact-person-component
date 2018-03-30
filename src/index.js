import React from "react";

import Checkbox from "@react-ag-components/checkbox"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import { RadioButtonGroup } from "material-ui/RadioButton"
import RadioButton from '@react-ag-components/radiobutton'
import EmailInput from '@react-ag-components/email-input'
import Input from "@react-ag-components/input";
import Address from "@react-ag-components/address";
import SelectField from "material-ui/SelectField";
import Messages from "@react-ag-components/messages";
import * as api from "./api";

import "./contactperson.css";

const contactPersonOptions = [
  { value: "ME", label: "I am the contact person" },
  { value: "OTHERCLIENT", label: "Someone else is the contact person" }
];

class ContactPerson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactPersonCode: window.IS_STAFF ? "OTHERCLIENT" : "ME",
      contactPerson: props.contactPerson || undefined,
      contactIsMe: props.contactPerson && props.contactPerson.currentUserIsContactPerson === "true",
      contactPersonIsLINK: props.contactPerson && (props.contactPerson.otherClientDetails !== null),
      linkContactPersonCode:"LINK",
      contactEmail: props.contactPerson && props.contactPerson.email,
      searchEmailKeyword: props.contactPerson && props.contactPerson.email,
      foundClient: false,
      foundContactFirstName:"",
      showVerifyButton: false,
      foundClientDetail: {},
      newSearch: true,
      standAlonePage: props.standAlonePage || false,
      standAloneLabel: props.standAloneLabel || "Save",
      hasChanged: false,
      showHeading: props.hasHeading || true
    };
  }

  componentWillMount = () => {
    if(this.state.contactPerson) {
      if(this.state.contactIsMe) {
        this.setState((prevState, props) => ({
          contactPersonCode: "ME",
          contacctIsMe: true
        }))
      } else {
        if(this.state.contactPersonIsLINK) {
          let contactPersonDoneStatus = true
          this.setState((prevState, props) => ({
            linkContactPersonCode: "LINK",
            contactPersonCode: "OTHERCLIENT",
            foundClient: true,
            newSearch: false,
            personDetail: this.state.contactPerson.otherClientDetails.personDetails,
            foundContactFirstName: this.state.contactPerson.otherClientDetails.personDetails.firstName,
            contactPersonDoneStatus: contactPersonDoneStatus
          }))
          this.props.contactPersonDoneStatus(contactPersonDoneStatus)
        } else {
          let contactPersonDoneStatus = true
          this.setState((prevState, props) => ({
            linkContactPersonCode: "NOTLINK",
            contactPersonCode: "OTHERCLIENT",
            showManualClientEntry: true,
            foundClient: false,
            newSearch: false,
            contactFirstName: this.state.contactPerson.otherPersonDetails.firstName,
            contactLastName: this.state.contactPerson.otherPersonDetails.lastName,
            contactPhone: this.state.contactPerson.otherPersonDetails.phone,
            contactPersonAddress: this.state.contactPerson.otherPersonDetails.postalAddress,
            contactPersonDoneStatus: contactPersonDoneStatus
          }))
          this.props.contactPersonDoneStatus(contactPersonDoneStatus)
        }
      }
    }else {
      let contactPersonDoneStatus = false
      this.setState((prevState, props) => ({
        contactPersonCode: "ME",
        contactIsMe: true,
        foundClient: false,
        showVerifyButton: window.IS_STAFF ? true : false,
        newSearch: true,
        contactPersonDoneStatus: contactPersonDoneStatus
      }))
      this.props.contactPersonDoneStatus(contactPersonDoneStatus)
    }
  }

  setContactPersonCode = (event) => {
    const contactPersonCode = event.target.value;
    let contactPersonDoneStatus = false
    this.setState((prevState, props) => ({
      contactPersonCode: contactPersonCode,
      contactIsMe: contactPersonCode === "ME" ? true : false,
      linkContactPersonCode: contactPersonCode === "ME" ? "" : "LINK",
      searchEmailKeyword: "",
      foundClient: false,
      showManualClientEntry:false,
      showVerifyButton: contactPersonCode === "OTHERCLIENT" ? true : false,
      newSearch: true,
      contactPersonDoneStatus: contactPersonDoneStatus
    }));
    this.props.contactPersonDoneStatus(contactPersonDoneStatus)
  };

  linkContactPerson = (e) => {
    const linkContactPersonCode = e.target.value;
    let contactPersonDoneStatus = contactPersonDoneStatus
    this.setState((prevState, props) => ({
      linkContactPersonCode: linkContactPersonCode,
      contactPersonDoneStatus: false
    }))
    this.props.contactPersonDoneStatus(contactPersonDoneStatus)
  }

  isValidEmail = (value) => {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value))
  }

  triggerFindClientContactPerson = () => {
    this.setState((prevState, props) => ({
      showVerifyButton: false,
      newSearch: true
    }))

    if(this.state.searchEmailKeyword !== "") {
      let type
      let id
      if(this.isValidEmail(this.state.searchEmailKeyword)) {
        type = "email"
      } else {
        type = "client-id"
      }
      id = this.state.searchEmailKeyword

      const URL_BASE = window.IS_STAFF ? '/partyas-rest/internal/api/v1/client/' : '/partyas-rest/external/api/v1/client/'

      fetch(URL_BASE + type + "/" + id, { credentials: 'same-origin' }).then(

      response => {
        if (response.status === 200) {
          response.text().then(data => {
            let parsedData = JSON.parse(data)

            if(parsedData.firstName !== null) {

              let contactEmail = this.isValidEmail(this.state.searchEmailKeyword) ? this.state.searchEmailKeyword : null
              let contactId = null

              if(contactEmail === null ){
                contactId = this.state.searchEmailKeyword
              }

              this.setState((prevState, props) => ({
                contactPersonDetail: parsedData,
                contactFirstName: parsedData.firstName,
                foundContactFirstName: parsedData.firstName,
                contactEmail: contactEmail,
                contactId: contactId,
                foundClient: true,
                showManualClientEntry: false
              }))
              {!window.IS_STAFF &&
                this.setState((prevState, props) => ({
                  foundContactFirstName: parsedData.firstName,
                  foundContactLastName: parsedData.lastName,
                  foundContactPhone: parsedData.phone,
                }))
              }
            } else {
              this.setState((prevState, props) => ({
                foundClient: false,
                showManualClientEntry: true
              }))
            }
          })
        }
      })
    }
  }

  handleClientContactPersonContinue = () => {
    this.setState((prevState, props) => ({
      newSearch: false,
      error: ""
    }))

    if (this.state.linkContactPersonCode && this.state.linkContactPersonCode === "NOTLINK") {
      if(this.state.contactFirstName === "" || this.state.contactLastName === "" || (this.state.contactEmail === "" || !this.isValidEmail(this.state.contactEmail))) {
        this.setState((prevState, props) => ({
          error: "Please complete Contact Person details"
        }))
      } else {
        let contactPersonDoneStatus = true
        this.setState((prevState, props) => ({
          error: "",
          contactPersonDoneStatus: contactPersonDoneStatus
        }))
        this.props.contactPersonDoneStatus(contactPersonDoneStatus)
      }
    } else {
      let contactPersonDoneStatus = true
      this.setState((prevState, props) => ({
        contactPersonDoneStatus: contactPersonDoneStatus
      }))
      this.props.contactPersonDoneStatus(contactPersonDoneStatus)
    }
  }

  handleClientContactPersonSave = () => {
    this.props.handleClientContactPersonSave()
  }

  updateSearchKeyword = () => {
    return value => {
      let contactPersonDoneStatus = false
      this.setState((prevState, props) => ({
        searchEmailKeyword: value,
        foundClient: false,
        showVerifyButton: true,
        newSearch: true,
        contactPersonDoneStatus: contactPersonDoneStatus
      }))
      this.props.contactPersonDoneStatus(contactPersonDoneStatus)
    }
  }

  onChange = field => {
    return value => {
      let contactPersonDoneStatus = false
      this.setState((prevState, props) => ({
        [field]: value,
        contactPersonDoneStatus: contactPersonDoneStatus
      }));
      this.props.contactPersonDoneStatus(contactPersonDoneStatus)
    };
  };

  getDetails = () => {
   let person = {}
   person.otherClientDetails = null
   person.otherPersonDetails = null
   person.contactPersonCode = this.state.contactPersonCode
   person.currentUserIsContactPerson = false

   person.email = this.isValidEmail(this.state.searchEmailKeyword) ? this.state.searchEmailKeyword : null
   let searchID

   if (person.email === null) {
     searchID = this.state.searchEmailKeyword
   }

    if (this.state.contactPersonCode === 'ME') {
      person.currentUserIsContactPerson = true
    } else {
      if(this.state.linkContactPersonCode === "LINK") {
        person.otherClientDetails = {}
        person.otherClientDetails.clientId = searchID
        person.otherClientDetails.personDetails = {}
        person.otherClientDetails.personDetails.firstName = this.state.foundContactFirstName
      } else {
        person.otherPersonDetails = {}
        person.otherPersonDetails.firstName = this.state.contactFirstName,
        person.otherPersonDetails.lastName = this.state.contactLastName,
        person.otherPersonDetails.phone = this.state.contactPhone,
        person.otherPersonDetails.postalAddress = this.state.contactPersonAddress
      }
    }
    return person
  }

  contactPersonHasChanged = () => {
    let hasChanged = false

    if (this.state.contactIsMe) {
        hasChanged = (this.state.contactIsMe !== this.state.contactPerson.currentUserIsContactPerson)
    } else {
      if(this.state.linkContactPersonCode === "LINK") {
        hasChanged = (this.state.contactEmail !== this.state.contactPerson.email)
      } else {
        hasChanged = ( (this.state.contactFirstName !== this.state.contactPerson.otherPersonDetails.firstName) ||
          (this.state.contactLastName !== this.state.contactPerson.otherPersonDetails.lastName) ||
          (this.state.contactEmail !== this.state.contactPerson.email) ||
          (this.state.contactPhone !== this.state.contactPerson.otherPersonDetails.phone) ||
          (this.state.contactPersonAddress !== this.state.contactPerson.otherPersonDetails.postalAddress) )
      }
    }
    return(hasChanged)
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
        <Messages
          success={this.state.success}
          error={this.state.error}
          info={this.state.info}
        />
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
              <button className="uikit-btn uikit-btn--tertiary search-button" onClick={this.triggerFindClientContactPerson}>Search for existing client</button>
            }

              {this.state.foundClient &&
                <div>
                  <p className="info-text">{this.state.newSearch && "Existing client has been found. "} Update email address or client id to change contact person.</p>
                    <div>
                      <MuiThemeProvider>
                        <RadioButtonGroup
                          name="linkContactPersonMode"
                          defaultSelected={this.state.linkContactPersonCode}
                          onChange={this.linkContactPerson}
                          valueSelected={this.state.linkContactPersonCode}
                        >
                          <RadioButton
                            value="LINK"
                            label={this.state.newSearch ? ("Use this existing client. '"  + this.state.foundContactFirstName  + "' as the contact person.") : (this.state.foundContactFirstName + " is the contact person.")}
                            style={checkStyle}
                            labelStyle={checkLabelStyle}
                            name="radio-linkContactPerson"
                          />
                          <RadioButton
                            value="NOTLINK"
                            label="Don't link to the existing client, enter details manually."
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
        {(this.state.showManualClientEntry  || (this.state.linkContactPersonCode === "NOTLINK")) && (!this.state.showVerifyButton) &&(
          <MuiThemeProvider>
          <div>
            {!this.state.foundClient &&
              <p className="info-text">{this.state.newSearch && "There is no client match. "} Update email address or client id to change contact person.</p>
            }
            {this.state.showHeading &&
            <h3>Detail of Contact Person</h3>
            }
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
                label="Phone (if known)"
                id="contact-phone"
                value={this.state.contactPhone}
                onChange={this.onChange("contactPhone")}
                required={true}
              />
            </div>

            <Address
              label="Postal address (if known)"
              value={this.state.contactPersonAddress}
              onChange={this.onChange("contactPersonAddress")}
            />
          </div>
        </MuiThemeProvider>
        )}

        {!this.state.showVerifyButton && (this.state.newSearch || !this.state.contactPersonDoneStatus) && !this.state.standAlonePage &&
          <button className="uikit-btn uikit-btn--tertiary search-button" onClick={this.handleClientContactPersonContinue}>Continue</button>
        }
        {!this.state.showVerifyButton &&  this.state.standAlonePage &&
          <button className="uikit-btn main-btn search-button" onClick={this.handleClientContactPersonSave}>{this.state.standAloneLabel}</button>
        }
      </div>
    );
  }
}
export default ContactPerson;
