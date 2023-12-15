
import { Request, Response, query } from 'express';
import { Inoticias_create, iNoticia } from '../interfaces/noticias/noticias.inteface';
//import { Repository } from 'typeorm';
import { dbcontext } from '../db/dbcontext';
import { Noticia } from '../models/noticias.entity';
import { ILike, IsNull } from 'typeorm';
import logger from '../helpers/logger';
import { kMaxLength } from 'buffer';
import { format } from 'path';
import { Console, log } from 'console';

export const noticiasIndex =async (req: Request, res: Response) => {

	const noticiaRepository=dbcontext.getRepository(Noticia)
	const noticias = await noticiaRepository.find({
		order: { create_at: 'DESC' },
		take: 10,
		where: { deleted_at: IsNull()},
	
	})
	
    
	res.render('home/index_views_noticias', { noticias, cantidad:noticias.length });
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


export const Listar =async (req: Request, res: Response) => {

	const noticiaRepository=dbcontext.getRepository(Noticia)

	const noticias= await noticiaRepository.find({
		order:{ create_at: 'DESC' },
		
		withDeleted: true,
	})
	if(noticias.length>0){
    res.render('noticias/listado_noticias',{noticias});
	}
	res.render('shared/error')
};  



export const getActulizarNoticia = async (req: Request, res: Response) => {
	try{
		const noticiaRepository = dbcontext.getRepository(Noticia);
		
		const noticia= await noticiaRepository.findOneBy({id:req.params.idNoticia})
		res.render('noticias/actualizar_noticias',{noticia});
		
}
catch(error){
	 	console.error(error);
		res.status(500).render('shared/error')
	 }}

	 
export const editarNoticia= async (req: Request, res: Response)=>{
	
 try{
 	const noticiaRepository = dbcontext.getRepository(Noticia)
	const noticia = await noticiaRepository.exist({
		where:{id:req.params.idNoticia}
	})
	const editNoticia:iNoticia= {
		titulo:req.body.titulo,
	    contenido:req.body.contenido,}

	
	await noticiaRepository.update(req.params.idNoticia, editNoticia)
	res.redirect('/noticias')
}catch(error){
	console.error(error);
	res.status(500).render('shared/error')
}}
	
export const borrarNoticia = async (req: Request, res: Response) => {
	const noticiaRepository = dbcontext.getRepository(Noticia);
	const noticia = await noticiaRepository.findOne({
		where: { id: req.params.idNoticia },
	});
	if (!noticia) {
		res.render('shared/error');
	}
	await noticiaRepository.softDelete(req.params.idNoticia);
	res.redirect('/noticias/listado');
};

export const recuperaNoticia = async (req: Request, res: Response) => {
	const noticiaRepository = dbcontext.getRepository(Noticia);
	const noticia = await noticiaRepository.findOne({
		where: { id: req.params.idNoticia },
		withDeleted:true
	});
	if (!noticia) {
		res.render('shared/error');
	}
	await noticiaRepository.restore(req.params.idNoticia);
	res.redirect('/noticias/listado');
};
