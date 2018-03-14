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
      searchTypeIndex: 0,
      searchEmailKeyword: "",
      searchIdKeyword: "",
      clientDetail: {"firstName":"Jamie"}
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

  setContactPersonCode = (event, index) => {
    this.setState((prevState, props) => ({
      contactPersonCode: contactPersonOptions[index].value,
      contactPersonLabel: contactPersonOptions[index].label,
      contactPersonIndex: index
    }))
  };

  findClientContactPerson = () => {
    let searchData = {}
    searchData.clientEmail = this.state.searchEmailKeyword
    searchData.clientId = this.state.searchIdKeyword
    // api.findClientContactPerson(searchData).then(
    //   data => {
    //     this.setState((prevState, props) => ({
    //       clientDetail: data
    //     }))
    //   }
    // )
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

    const selectFieldStyle = {
      width: "100%",
      'color':'#999'
    };

    return (
      <div className="contact-person-component">
        <h3>Contact Person</h3>
        {!window.IS_STAFF &&
          <MuiThemeProvider>
            <SelectField
             floatingLabelText="Contact Person Type..."
             onChange={this.setContactPersonCode}
             value={this.state.contactPersonCode}
             style={selectFieldStyle}
             floatingLabelStyle={selectFieldStyle}
             >
               {contactPersonOptions.map((searchOption) =>
                 <MenuItem key={searchOption.value} value={searchOption.value} primaryText={searchOption.label} />
               )}
            </SelectField>
          </MuiThemeProvider>
        }


        {(this.state.contactPersonCode === "OTHERCLIENT" || window.IS_STAFF) && (
          <div className="other-client-container">
            <MuiThemeProvider>
              <Input
                label={"Contact Person Email"}
                id="search"
                value={this.state.searchEmailKeyword}
                onChange={this.onChange("searchEmailKeyword")}
                placeholder={
                  "Client Email or Client ID"
                }
              />
            </MuiThemeProvider>
            <button className="search-button">Search</button>
          </div>
        )}
        {this.state.contactPersonCode === "OTHER" && (
          <MuiThemeProvider>
          <div>
            <h3>Detail of Contact Person</h3>
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
        </MuiThemeProvider>
        )}
      </div>
    );
  }
}
export default ContactPerson;
