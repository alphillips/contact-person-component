import React from 'react'
import { hashHistory } from 'react-router'

import Messages from '@react-ag-components/messages'
import ExporterApplicationMenu from './../ApplicationMenu'

import Input from '@react-ag-components/input'
// import ContactPerson from '@react-ag-components/contact-person'
import ContactPerson from './../../../components/ContactPerson'
import EmailInput from '@react-ag-components/email-input'
import wrapPage from './../../../components/wrappers/PageWrapper'
import RadioButton from '@react-ag-components/radiobutton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {RadioButtonGroup} from 'material-ui/RadioButton'
import Address from '@react-ag-components/address'
import Validator from './../Validator'
import * as api from './../../../services/api'

class ExporterContact extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      success: props.success,
      error: props.cache.contactPersonError ? props.cache.contactPersonError.msg : props.error,
      info: props.info,
      contactPerson: props.cache.contactPerson
    }
  }
  componentDidMount() {
    let person = this.person
     api.getUser().then(
       data => {
         this.setState((prevState, props) => ({
          currentUserName: data.firstName + " " + data.lastName,
          currentUserLogonId: data.logonId
         }))
       }
     )
   }

  componentWillReceiveProps(nextProps) {
   if(nextProps.value) {
     this.setState((prevState, props) => ({
       value: nextProps.value
     }))
   }
  }

  componentWillUnmount = () => {
    let details = this.getDetails()
    this.props.saveCache('contactPerson', details.contactPerson);
    let error = this.refs.contactPerson.getErrorObj();
    this.props.saveCache('contactPersonError', error);
  }

  getDetails = () => {
    let details = {}
    let contactPerson = {}
    contactPerson = this.refs.contactPerson.getDetails();
    details.contactPerson = contactPerson
    return details
  }

  contactPersonDoneStatus = status => {
    this.setState((prevState, props) => ({
      contactPersonDoneStatus: status
    }));
  };

  updateMsg = status => {
    this.setState((prevState, props) => ({
      [status.type]: status.msg
    }));
    if (status.msg !== "") {
      window.scroll(0, 0);
    }
  };


  handleNext = () => {
    let data = this.getDetails()
    let error = this.refs.contactPerson.getErrorObj()

    if(error.msg === ""){
       hashHistory.push('/exporter/print/' )
    }
  }

  render() {

    const checkStyle = {
      marginTop: '1em',
      'color':'#999'
    }

    const checkLabelStyle = {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
    }

    let count = 0

    return (
      <div>

        <div className="page-menu-grid">

          <h1 className="inpage-header">Register to be an Exporter</h1>

          <ExporterApplicationMenu current="exportercontact" />
          <div className="page">

          <Messages
            success={this.state.success}
            error={this.state.error}
            info={this.state.info}
            warning={this.state.warning}
          />

          <div className="page-header-grid">
            <div className="page-header">
              <h2>Exporter Contact</h2>
            </div>
          </div>

          <ContactPerson
            ref="contactPerson"
            contactPersonDoneStatus={this.contactPersonDoneStatus}
            contactPersonMsg={this.updateMsg}
            standAlonePage={true}
            standAloneLabel="Next"
            notShowHeading={true}
            contactPerson={this.state.contactPerson}
            handleClientContactPersonSave = {this.handleNext}
          />

      </div>
    </div>
  </div>
    )
  }
}
export default wrapPage()(ExporterContact)
