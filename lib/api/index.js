'use strict';

var _api = require('@react-ag-components/core/lib/api');

// app.get('/internal/api/v1/client/:type/:id', function (req, res) {
//     res.json(firstNameFound)
//   })
//   app.get('/external/api/v1/client/:type/:id', function (req, res) {
//     res.json(firstNameFound)
//   })
var URL_BASE = process.env.API_HOST || '';