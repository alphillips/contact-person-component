const URL_BASE = (process.env.API_HOST || '') + '/api/'

import {get, post, put, del, formPost} from '@react-ag-components/core/lib/api'

export function findClientEmailID(type, id) {
       return get('/contact-person/api/contactpersonservice/v1/contactperson/type/' + type + "/id/" + id)
}
