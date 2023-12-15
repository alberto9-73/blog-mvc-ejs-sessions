import express from 'express';

import {  borrarUsuario, crearUsuario, crearUsuarioVista, editarUsuario, getActulizarUsuario, listar, recuperaUsuario } from '../controllers/usuario.controller';

const usuarioRoutes = express.Router();

usuarioRoutes.get('/crear',crearUsuarioVista );
usuarioRoutes.post('/crear',crearUsuario );
usuarioRoutes.get('/listar', listar)
usuarioRoutes.get('/traer/get/:id', getActulizarUsuario)
usuarioRoutes.post('/editar/post/:id',editarUsuario)
usuarioRoutes.get('/borrar/:id', borrarUsuario)
usuarioRoutes.get('/restore/:id', recuperaUsuario)


export default usuarioRoutes;