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
    "email": "email@email.com",
    "otherClientDetails": {
      "clientId": "65465456",
      "personDetails": {
        "firstName": "John"
      }
    },
    "otherPersonDetails": {
      "firstName": "Cindy",
      "lastName": "Pak",
      "phone": "234234",
      "postalAddress": {
        "addressLine1": "5 jason street",
        "suburb": "maroo",
        "state": "stateact",
        "postcode": "234234",
        "country": "au"
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
  }

  render() {
    return (<div className="uikit-body">
      <ContactPerson ref="contactPerson"
      contactPerson={contactPerson.contactPerson}
      standAlonePage={false}
      handleClientContactPersonSave={this.handleClientContactPersonSave}
      contactPersonDoneStatus={this.contactPersonDoneStatus.bind(status)}
      notShowHeading={true}
      />

      {this.state.contactPersonDoneStatus &&
        <button>some random button</button>
      }

    </div>)
  }
}

render(<Demo/>, document.querySelector('#demo'))
