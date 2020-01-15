const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

// Query Params: method get, req.query (Filtros, ordenação, paginação ...), ?id=100&nome=allan
// Route Params: method delete, req.params (identificar um recurso na alteração ou remoção)
// Body: req.body (criação ou alteração de registro)
// MongoDB (não relacional)

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.get('/search', SearchController.index);
routes.get('/show', DevController.show);

module.exports = routes;