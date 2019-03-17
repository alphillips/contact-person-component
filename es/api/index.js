var URL_BASE = process.env.API_HOST || '';

import { get, post, put, del, formPost } from '@react-ag-components/core/lib/api';

// app.get('/internal/api/v1/client/:type/:id', function (req, res) {
//     res.json(firstNameFound)
//   })
//   app.get('/external/api/v1/client/:type/:id', function (req, res) {
//     res.json(firstNameFound)
//   })