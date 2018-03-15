import React from 'react'
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

let Demo = React.createClass({
  render() {
    return <div className="uikit-body">
      <ContactPerson ref="contactPerson" contactPerson={contactPerson.contactPerson}  />

    </div>
  }
})

render(<Demo/>, document.querySelector('#demo'))
