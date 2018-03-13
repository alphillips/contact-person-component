import React from 'react'
import {render} from 'react-dom'

import './uikit.css'
import './base.css'

import ContactPerson from '../../src'

// window.IS_STAFF = true
let contactPerson = {}
contactPerson =
{
  "contactPerson": {
    "contactPersonCode": "OTHER",
    "sameAsRequester": false,
    "firstName": "contactFirst",
    "lastName": "contactLast",
    "email": "first.last@gmail.com",
    "phone": "23445",
    "postalAddress": {
      "addressLine1": "5th Ave",
      "addressLine2": "",
      "addressLine3": "",
      "suburb": "New York",
      "state": "NY",
      "country": "US"
    }
  }
}

let Demo = React.createClass({
  render() {
    return <div className="uikit-body">
      <ContactPerson ref="contactPerson" contactPerson={contactPerson}  />
    </div>
  }
})

render(<Demo/>, document.querySelector('#demo'))
