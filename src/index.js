import React from "react";

import Checkbox from "@react-ag-components/checkbox"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import { RadioButtonGroup } from "material-ui/RadioButton"
import RadioButton from '@react-ag-components/radiobutton'
import EmailInput from '@react-ag-components/email-input'
import Input from "@react-ag-components/input";
import Address from "@react-ag-components/address";


import "./contactperson.css";

class ContactPerson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactPerson: props.contactPerson,
      contactPersonCode: "ME"
    };
  }

  componentWillMount = () => {
    if(this.state.contactPerson !== undefined) {
      this.setState((prevState, props) => ({
        contactPersonCode: (this.state.contactPerson.sameAsRequester === false) ? "OTHER" : "ME",
        sameAsRequester: this.state.contactPerson.sameAsRequester || true,
        contactPersonAddress: this.state.contactPerson.postalAddress || {},
        contactEmail: this.state.contactPerson.email || "",
        contactPhone: this.state.contactPerson.phone || "",
        contactFirstName: this.state.contactPerson.firstName || "",
        contactLastName: this.state.contactPerson.lastName || ""
      }))
    }
  }

  setContactPersonCode = event => {
    const contactPersonCode = event.target.value;
    this.setState((prevState, props) => ({
      contactPersonCode: contactPersonCode
    }));
    {this.props.markDirty !== undefined &&
      this.props.markDirty("contactPersonCode", contactPersonCode)
    }
  };

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
      person.sameAsRequester = true
    } else {
      person.sameAsRequester = false
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
    return (
      <div>
        <h3>Contact Person</h3>
        <MuiThemeProvider>
          <RadioButtonGroup
            name="contactPersonMode"
            defaultSelected={this.state.contactPersonCode}
            onChange={this.setContactPersonCode}
            valueSelected={this.state.contactPersonCode}
          >
            <RadioButton
              value="ME"
              label="I want to be the contact person "
              style={checkStyle}
              labelStyle={checkLabelStyle}
              name="radio-contactPersonMode"
            />
            <RadioButton
              value="OTHER"
              label="I want to nominate someone else to be the contact person"
              style={checkStyle}
              labelStyle={checkLabelStyle}
              name="radio-contactPersonMode"
            />
          </RadioButtonGroup>
        </MuiThemeProvider>

        {this.state.contactPersonCode === "OTHER" && (
          <div>
            <div className="half-area">
              <Input
                label="First Name"
                id="contact-name"
                value={this.state.contactFirstName}
                onChange={this.onChange("contactFirstName")}
                required={true}
              />
              <Input
                label="Last Name"
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
              label="Postal Address"
              value={this.state.contactPersonAddress}
              onChange={this.onChange("contactPersonAddress")}
            />
          </div>
        )}
      </div>
    );
  }
}
export default ContactPerson;
