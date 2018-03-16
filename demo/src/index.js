import React, {Component} from 'react'
import {render} from 'react-dom'

import './uikit.css'
import './base.css'

import ContactPerson from '../../src'

// window.IS_STAFF = true

let contactPerson =
{
  "contactPerson": {
    "currentUserIsContactPerson": "false",
    "otherClientDetails": {
      // "clientId": "65465456",
      // "clientEmail": "pak@agriculture.com",
      // "personDetails": {
      //   "firstName": "Cindy"
      //   // "lastName": "Pak",
      //   // "phone": "23574457",
      //   // "mobile": "0436774457"
      // }
    },
    "otherPersonDetails": {
      "firstName": "Cindy",
      "lastName": "Pak",
      "email": "pak@agriculture.com",
      "phone": "234234",
      "mobile": "234234",
      "postalAddress": {
        "addressLine1": "5 jason street",
        "suburb": "maroo",
        "state": "stateact",
        "postcode": "234234",
        "country": "bestCountry"
      }
    }
  }
}

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactPersonDoneStatus: false
    }
  }
  contactPersonDoneStatus = (status) => {
    this.setState((prevState, props) => ({
      contactPersonDoneStatus: status
    }))
  }

  handleClientContactPersonSave = () => {
    console.log("handleClientContactPersonSave")
  }

  render() {
    return (<div className="uikit-body">
      <ContactPerson ref="contactPerson" contactPerson={contactPerson.contactPerson} standAlonePage={false} handleClientContactPersonSave={this.handleClientContactPersonSave} contactPersonDoneStatus={this.contactPersonDoneStatus.bind(status)} />

      {this.state.contactPersonDoneStatus &&
        <button>some random button</button>
      }

    </div>)
  }
}

render(<Demo/>, document.querySelector('#demo'))
