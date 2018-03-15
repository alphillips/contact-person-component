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
      "clientId": "65465456",
      "clientEmail": "",
      "personDetails": {
        "firstName": "",
        "lastName": "",
        "phone": "",
        "mobile": ""
      }
    },
    "otherPersonDetails": {
      "firstName": "",
      "lastName": "",
      "email": "",
      "phone": "",
      "mobile": "",
      "postalAddress": {
        "addressLine1": "",
        "suburb": "",
        "state": "",
        "postcode": "",
        "country": ""
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
