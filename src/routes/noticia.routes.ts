import express from 'express';

import {
	noticiasIndex,
	crearNoticiaView,
	crearNoticia,
	getNoticiaById,
} from '../controllers/noticia.controller';

const noticiasRoutes = express.Router();

noticiasRoutes.get('/', noticiasIndex);
noticiasRoutes.get('/crear', crearNoticiaView);
noticiasRoutes.post('/crear', crearNoticia);
noticiasRoutes.get('/:idNoticia',getNoticiaById );


export default noticiasRoutes;
