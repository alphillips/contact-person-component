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
<ContactPerson ref="contactPerson" contactPerson={contactPerson.contactPerson} standAlonePage={false} handleClientContactPersonSave={this.handleClientContactPersonSave} contactPersonDoneStatus={this.contactPersonDoneStatus.bind(status)} />

```

### Properties

| prop        | Type           | Note  |
| ------------- |:-------------:| -----:|
| contactPerson      | object | data.contactPerson |
| standAlonePage     | boolean      |   Has own Save button |
| handleClientContactPersonSave     | function      |   perform save |
| contactPersonDoneStatus     | function      |   broadcast done, usually use to show the rest of the fields on the page |


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
