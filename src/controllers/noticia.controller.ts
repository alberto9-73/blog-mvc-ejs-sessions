
import { Request, Response, query } from 'express';
import { Inoticias_create, iNoticia } from '../interfaces/noticias/noticias.inteface';
//import { Repository } from 'typeorm';
import { dbcontext } from '../db/dbcontext';
import { Noticia } from '../models/noticias.entity';
import { ILike } from 'typeorm';
import logger from '../helpers/logger';
import { kMaxLength } from 'buffer';
import { format } from 'path';
import { Console, log } from 'console';

export const noticiasIndex =async (req: Request, res: Response) => {

	const noticiaRepository=dbcontext.getRepository(Noticia)

	const noticias= await noticiaRepository.find({
		order:{ create_at: 'DESC' },
		take:10 
	})
	
    
	res.render('home/index_views_noticias', { noticias });
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


//Obtener las noticias
export const getNoticiaById= async (req: Request, res: Response) => {
try{	
	const noticiaRepository = dbcontext.getRepository(Noticia);
	const noticia= await noticiaRepository.findOneBy({id:req.params.idNoticia})
	res.render('noticias/buscar_noticia',{noticia})

} catch (error) { 
			logger.error(`No se pudo obtener la noticia con id ${req.params.id} desde el ip ${req.ip} `
			);
			res.status(404).json({ msg: 'No se pudo encontrar la noticia' });
}}

// 	try {
// 		//const titulo=req.query.titulo?.toString();
// 		//const contenido=req.query.contenido?.toString();
// 		const idNoticia=req.query.id?.toString();
		
// 		const noticiaRepository = dbcontext.getRepository(Noticia);
		
// 		const noticia = await noticiaRepository.find({
// 			where:  {
// 					//titulo: ILike(`%${titulo || ''}%`),
// 					//contenido: ILike(`%${contenido || ''}%`),
// 					id:idNoticia
// 				},
// 				relations: {
// 					comentarios: true,
// 				},
// 			},
			
// 		);
		
// 		if (!noticia) {
// 			throw new Error();
// 		}
		
// 		//res.json({ noticia,cantidad: noticia.length});
		
// 		console.log(noticia)	
		
// 		res.render('/noticia/noticia.buscar',{noticia})
		
		
// 	} catch (error) { 
// 		logger.error(
// 			`No se pudo obtener la noticia con id ${req.params.id} desde el ip ${req.ip} `
// 		);
// 		res.status(404).json({ msg: 'No se pudo encontrar la noticia' });
// 	}
// };