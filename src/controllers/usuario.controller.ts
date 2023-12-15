import { Request, Response, query } from 'express';
import { dbcontext } from '../db/dbcontext';
import { Iusuario } from '../interfaces/usuario/usuari.interface';
import { Usuarios } from '../models/usuarios.entity';


export const crearUsuarioVista = (req: Request, res: Response) => {

	res.render('usuarios/crear_usuario');
};
export const crearUsuario = async (req: Request, res: Response) => {
	const data: Iusuario = req.body
	try {
		if (data.nombre.trim() != '' || data.apellido.trim() != '' || data.email.trim() != '' || data.pass.trim() != '') {

			const usuarioRepository = dbcontext.getRepository(Usuarios);
			const nuevoUsuario: Iusuario = { nombre: req.body.nombre, apellido: req.body.apellido, email: req.body.email, pass: req.body.pass };
			// creamos al usurio sin guardar
			const usuario = usuarioRepository.create({
				...nuevoUsuario,
			});
			const resultus = await usuarioRepository.save(usuario);
			res.status(200).redirect('/noticias');
		} else {
			res.render('shared/error')
		}
	} catch (error) {
		console.error(error);
		res.status(500).render('shared/error');
	}
}


export const listar = async (req: Request, res: Response) => {
	try {
		const usuarioRepository = dbcontext.getRepository(Usuarios)

		const usuarios = await usuarioRepository.find({
			order: { create_at: 'DESC' },

			withDeleted: true,
		})
		if (usuarios.length > 0) {
			res.render('usuarios/listado_usuarios', { usuarios });
		}
	} catch (error) {
		console.error(error);
		res.status(500).render('shared/error');
	}
}


export const getActulizarUsuario = async (req: Request, res: Response) => {
	try {
		const usuarioRepository = dbcontext.getRepository(Usuarios);

		const usuario = await usuarioRepository.findOneBy({ id: req.params.id })
		res.render('usuarios/actualizar_usuario', { usuario });

	}
	catch (error) {
		console.error(error);
		res.status(500).render('shared/error')
	}
}

export const editarUsuario = async (req: Request, res: Response) => {

	try {
		const usuarioRepository = dbcontext.getRepository(Usuarios)
		const usuario= await usuarioRepository.exist({
			where: { id: req.params.id }
		})
		const editUsuario: Iusuario = {
			id:req.body.id,
			nombre: req.body.nombre,
			apellido: req.body.apellido,
			email: req.body.email,
			pass:req.body.pass
		}

        await usuarioRepository.update(req.params.id, editUsuario)
		res.redirect('/usuario/listar')
	} catch (error) {
		console.error(error);
		res.status(500).render('shared/error')
	}
}

export const borrarUsuario= async (req: Request, res: Response) => {
	const usuarioRepository = dbcontext.getRepository(Usuarios);
	const usuario= await usuarioRepository.findOne({
		where: { id: req.params.id },
	});
	if (!usuario) {
		res.render('shared/error');
	}
	await usuarioRepository.softDelete(req.params.id);
	res.redirect('/usuario/listar');
};

export const recuperaUsuario= async (req: Request, res: Response) => {
	const usuarioRepository = dbcontext.getRepository(Usuarios);
	const usuario = await usuarioRepository.findOne({
		where: { id: req.params.id },
		withDeleted:true
	});
	if (!usuario) {
		res.render('shared/error');
	}
	await usuarioRepository.restore(req.params.id);
	res.redirect('/usuario/listar');
};