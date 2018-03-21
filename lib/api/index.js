'use strict';

exports.__esModule = true;
exports.findClientEmailID = findClientEmailID;

var _api = require('@react-ag-components/core/lib/api');

var URL_BASE = process.env.API_HOST || '';

function findClientEmailID(type, id) {
   return (0, _api.get)(URL_BASE + '/v1/contactperson/type/' + type + "/id/" + id);
}