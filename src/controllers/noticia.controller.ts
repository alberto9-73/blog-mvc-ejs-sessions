
import { Request, Response } from 'express';
import { Inoticias_create, iNoticia } from '../interfaces/noticias.inteface';
import { Repository } from 'typeorm';
import { dbcontext } from '../db/dbcontext';
import { Noticia } from '../models/noticias.entity';

export const noticiasIndex = (req: Request, res: Response) => {
	// Aca devolver todas las noticias ordenadas por fecha

	// ver documentacion de typeorm
	const nombre = 'Pedro';
	res.render('home/index', { nombre });
};

export const crearNoticiaView = (req: Request, res: Response) => {
	res.render('noticias/crear');
};
export const crearNoticia = async(req: Request, res: Response) => {
	const data: Inoticias_create= req.body
try {
	if (data.titulo_noticia.trim() != '' || data.desc_noticia.trim() != '') {

    const noticiaRepository = dbcontext.getRepository(Noticia);
	const nuevaNoticia: iNoticia = {titulo:req.body.titulo_noticia,contenido:req.body.desc_noticia};
	// creamos la noticia sin guardar
	const noticia =  noticiaRepository.create({
		...nuevaNoticia,
		//usuario: { id: req.usuario.id },
	});
	const result = await noticiaRepository.save(noticia);
	res.status(200).redirect('/noticias');
}else{
	res.render('shared/error')
}} catch (error) {
	console.error(error);
	res.status(500).render('shared/error');
}}


