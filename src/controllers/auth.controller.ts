import {Request,Response} from "express";

export const loginController = (req:Request, res:Response) => {
	if (req.session) {
		req.session.user = { id: 1, username: 'Alberto Gonzalez', rol:'super adnistrador'};
	}
	res.send('Inicio de sesión exitoso.');
};

export const quiensoyController = (req:Request, res:Response) => {
	if (req.session?.user) {
		const user = req.session.user;
		res.render('quiensoy',{user})
	}else{
		res.send('No estas logeado')
	}
}

export const logoutController = (req:Request, res:Response)=>{
	
    req.session?.destroy((err)=>{
        console.log(err);
        
    })
        
    res.send('Sesion Cerrada correctamente')
    }