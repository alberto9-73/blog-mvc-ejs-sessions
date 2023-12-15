import express from 'express';

import {
	noticiasIndex,
	crearNoticiaView,
	crearNoticia,
	getNoticiaById,
	Listar,
	getActulizarNoticia, 
	editarNoticia,
	borrarNoticia,
	recuperaNoticia,
} from '../controllers/noticia.controller';

const noticiasRoutes = express.Router();

noticiasRoutes.get('/', noticiasIndex);
noticiasRoutes.get('/crear', crearNoticiaView);
noticiasRoutes.post('/crear', crearNoticia);
noticiasRoutes.get('/get/:idNoticia',getNoticiaById );
noticiasRoutes.get('/listar', Listar)
noticiasRoutes.get('/traer/get/:idNoticia', getActulizarNoticia)
noticiasRoutes.post('/editar/patch/:idNoticia', editarNoticia)
noticiasRoutes.get('/borrar/:idNoticia', borrarNoticia)
noticiasRoutes.get('/restore/:idNoticia', recuperaNoticia)
export default noticiasRoutes;
