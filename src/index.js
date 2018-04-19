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
      contactPerson: props.contactPerson,
      contactIsMe: props.contactPerson && props.contactPerson.currentUserIsContactPerson === true,
      contactPersonIsLINK: props.contactPerson && (props.contactPerson.otherClientDetails !== null),
      linkContactPersonCode:"LINK",
      contactEmail: props.contactPerson && props.contactPerson.email,
      searchEmailKeyword: props.contactPerson !== undefined ? props.contactPerson.email : null,
      foundClient: false,
      foundContactFirstName:"",
      contactLastName: null,
      showVerifyButton: false,
      foundClientDetail: {},
      newSearch: true,
      standAlonePage: props.standAlonePage || false,
      standAloneLabel: props.standAloneLabel || "Save",
      hasChanged: false,
      notShowHeading: props.notShowHeading || false
    };
    this.errObj = {}
  }

  componentWillMount = () => {
    if(!this.isBlank(this.state.contactPerson)) {
      if(this.state.contactIsMe) {
        this.setState((prevState, props) => ({
          contactPersonCode: "ME",
          contactIsMe: true
        }))
      } else {
        if(this.state.contactPersonIsLINK ) {
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
        contactPersonDoneStatus: contactPersonDoneStatus,
        searchEmailKeyword: null,
        contactLastName: null
      }))
      this.props.contactPersonDoneStatus(contactPersonDoneStatus)
      if (window.IS_STAFF) {
        this.setState((prevState, props) => ({
          contactPersonCode: "OTHERCLIENT",
          contactIsMe: false
        }))
      }
    }
  }

  isBlank = (val) => {
    let isBlank = false
    // catch null and undefined
    if(!val || JSON.stringify(val) === "{}") {
      isBlank = true
    } else {
      if (typeof val === "string") {
        if (val.trim() == "" || val === "undefined") {
          isBlank = true;
        }
      }
       if (typeof val === "object") {
         if (Object.keys(val).length === 0) {
           isBlank = true;
         }
       }
    }
     return isBlank;
  }

  setContactPersonCode = (event) => {
    const contactPersonCode = event.target.value;
    let contactPersonDoneStatus = false
    this.setState((prevState, props) => ({
      contactPersonCode: contactPersonCode,
      contactIsMe: contactPersonCode === "ME" ? true : false,
      linkContactPersonCode: contactPersonCode === "ME" ? "" : "LINK",
      searchEmailKeyword: null,
      foundClient: false,
      showManualClientEntry:false,
      showVerifyButton: contactPersonCode === "OTHERCLIENT" ? true : false,
      newSearch: true,
      contactPersonDoneStatus: contactPersonDoneStatus
    }));
    this.errObj = {}
    this.errObj.type = "error"
    this.errObj.msg = ""

    this.props.contactPersonMsg(this.errObj)

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

  triggerFindClientContactPerson = (keyword) => {
    this.setState((prevState, props) => ({
      showVerifyButton: false,
      newSearch: true
    }))

    if(keyword !== null) {
      let type
      let id
      if(this.isValidEmail(keyword)) {
        type = "email"
      } else {
        type = "client-id"
      }
      id = keyword

      this.errObj = {}
      this.errObj.type = "error"
      this.errObj.msg = ""

      this.props.contactPersonMsg(this.errObj)


      const URL_BASE = window.IS_STAFF ? '/partyas-rest/internal/api/v1/client/' : '/partyas-rest/external/api/v1/client/'

      fetch(URL_BASE + type + "/" + id, { credentials: 'same-origin' }).then(

      response => {
        if (response.status === 200) {

          response.text().then(data => {
            let parsedData = JSON.parse(data)

            if(parsedData.firstName !== null ) {

              let contactEmail = this.isValidEmail(keyword) ? keyword : null
              let contactId = null

              if(contactEmail === null ){
                contactId = keyword
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
                showManualClientEntry: true,
                contactPersonCode: "OTHERCLIENT",
                contactIsMe: false,
                linkContactPersonCode:"NOTLINK"
              }))
            }
          })
        } else {
          this.errObj = {}
          this.errObj.type = "error"
          this.errObj.msg = "There was an error with the server"

          this.props.contactPersonMsg(this.errObj)

          this.setState((prevState, props) => ({
            showVerifyButton: true,
            newSearch: true
          }))
        }
      })
    }else {
      this.errObj = {}
      this.errObj.type = "error"
      this.errObj.msg = "Please provide Contact person email or Client ID"

      this.props.contactPersonMsg(this.errObj)

      this.setState((prevState, props) => ({
        showVerifyButton: true,
        newSearch: true
      }))
    }
  }

  handleClientContactPersonContinue = () => {
    this.setState((prevState, props) => ({
      newSearch: false
    }))

    this.triggerErrObj()

    if (this.state.linkContactPersonCode && this.state.linkContactPersonCode === "NOTLINK") {
    } else {
      let contactPersonDoneStatus = true
      this.setState((prevState, props) => ({
        contactPersonDoneStatus: contactPersonDoneStatus
      }))
      this.props.contactPersonDoneStatus(contactPersonDoneStatus)
    }

    this.props.contactPersonMsg(this.errObj)

    if(this.state.standAlonePage){
      if(this.errObj.msg === "") {
        this.props.handleClientContactPersonSave()
      }
    }
  }

  updateSearchKeyword = () => {
    return value => {
      let contactPersonDoneStatus = false
      this.setState((prevState, props) => ({
        error: "",
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

  triggerErrObj = () => {
    this.errObj = {}
    this.errObj.type = "error"
    this.errObj.msg = ""

    let errMsg = ""

    if (this.state.linkContactPersonCode && this.state.linkContactPersonCode === "NOTLINK") {
      if(this.isBlank(this.state.contactFirstName) || this.isBlank(this.state.contactLastName) || this.isBlank(this.state.contactEmail) || !this.isValidEmail(this.state.contactEmail)) {
        if(this.isBlank(this.state.contactFirstName)) {
          errMsg = "Contact first name cannot be blank"
        }
        if(this.isBlank(this.state.contactLastName)) {
          errMsg = "Contact last name cannot be blank"
        }
        if(this.isBlank(this.state.contactEmail)) {
          errMsg = "Contact email cannot be blank"
        }
        if(!this.isValidEmail(this.state.contactEmail)) {
          errMsg = "Contact email needs to be a valid email"
        }
      } else {
        errMsg = ""
      }
      this.errObj.msg = errMsg
    }
  }

  getErrorObj = () => {
    this.errObj = {}
    this.errObj.type = "error"
    this.errObj.msg = ""

    this.triggerErrObj()
    return this.errObj
  }

  getDetails = () => {
   let person = {}
   person.otherClientDetails = null
   person.otherPersonDetails = null
   person.currentUserIsContactPerson = false

   let searchID

   if(this.state.foundClient){
     person.email = this.isValidEmail(this.state.searchEmailKeyword) ? this.state.searchEmailKeyword : null

     if (person.email === null) {
       searchID = this.state.searchEmailKeyword
     }
   } else {
      person.email = this.state.contactEmail
      searchID = null
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
        hasChanged = (this.state.contactPerson.otherPersonDetails !== null ? (this.state.contactFirstName !== this.state.contactPerson.otherPersonDetails.firstName) : true ||
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
        {this.state.standAlonePage &&
        <Messages
          success={this.state.success}
          error={this.state.error}
          info={this.state.info}
        />
        }
        {!this.state.notShowHeading &&
          <h3>Contact Person</h3>
        }
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
              <button className="uikit-btn uikit-btn--tertiary search-button" onClick={this.triggerFindClientContactPerson.bind(this,this.state.searchEmailKeyword)}>Search for existing client</button>
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
                label="Phone (if known)"
                id="contact-phone"
                value={this.state.contactPhone}
                onChange={this.onChange("contactPhone")}
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
          <button className="uikit-btn main-btn search-button" onClick={this.handleClientContactPersonContinue}>{this.state.standAloneLabel}</button>
        }
      </div>
    );
  }
}
export default ContactPerson;
