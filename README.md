# contact-person

React contact-person component for external web apps

## Usage

### Install
```
npm i @react-ag-components/contact-person --save
```
### Use in your project
```
import ContactPerson from '@react-ag-components/contact-person'
```

```
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
```

```
<ContactPerson
  ref="contactPerson"
  contactPersonDoneStatus={this.contactPersonDoneStatus.bind(status)}
  contactPersonMsg={this.updateMsg.bind(status)}
  standAlonePage={false}
  notShowHeading={false}
  contactPerson={this.state.contactPerson}
/>

```

### Properties

| prop        | Type           | Note  |
| ------------- |:-------------:| -----:|
| contactPerson      | object | contactPerson object provide by the parent page |
| standAlonePage     | boolean      |   Has own Save button |
| handleClientContactPersonSave     | function      |   perform save |
| contactPersonDoneStatus     | function      |   broadcast done, usually use to show/hide the rest of the fields on the parent page |
| standAloneLabel     | string      |   default is "Save" |
| getErrorObj()     | function      |   let error = this.refs.contactPerson.getErrorObj(), error.type and error.msg available |
| getDetails()     | function      |   let details = this.refs.contactPerson.getDetails() returns contactPerson object |
| notShowHeading     | boolean      |   parent page will provide it's own heading, description. |



## Contributing

Get the repository
```
git clone https://github.com/alphillips/contact-person-component.git
```

Update dependencies
```
npm install
```

Run the project
```
npm start
```

### Deploy to npm
#### Build
`npm run build -- --copy-files`

#### Publish
`npm publish --access public`
