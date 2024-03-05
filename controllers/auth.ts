import { Response , Request} from "express";
import userModel from "../models/auth";
import jwt from "jsonwebtoken"
import "dotenv/config";

//validamos que el usuario sea correcto para ingresar
export const loginAuth = async (req:Request, res: Response) => {
    try {
    const {email} = req.params;
    const {password} = req.body;
    const userValidate = await userModel.findOne({email, login_code:password });
    
    if (!userValidate) {
       return res.status(401).json( { ok: false , message:"Usuario invalido"} )
   }
    const secret_key= process.env.SECRET_KEY as string
    
   const token = jwt.sign({
    sub: userValidate._id,
     name: userValidate.names,
      email: userValidate.email, 
      role: userValidate.roles
         }, secret_key )

        res.cookie('jwt',token)
        res.status(200).json({ok: true, message:"envio de token correcto"})
    } catch (error) {
        // Aquí puedes agregar más información sobre el error para depuración
        res.status(500).json({ ok: false, message: "Error en el servidor" });
    }
}

//limpiamos el token para salir y cerrar sesion
export const logout = async(req:Request, res: Response)=>{
    try {
        res.clearCookie('jwt')
        res.status(200).json({ok:true, message:"cookie eliminada"})
    } catch (error) {
        
    }
 
}
//creamos el usuario o empleado nuevo
export const createUser = async (req:Request, res: Response) => {
    try {  
       const {names, lastnames, email, login_code, roles} = req.body
       const isAdmin = roles === 'admin'
       let useRoles

       if (isAdmin) {
           useRoles = {admin:true, seller: false}
       } else {
          useRoles = {admin:false, seller: true}
       }
       const userData = {
        names,
        lastnames,
        email,
        login_code,
        roles: useRoles
       };
        await userModel.create(userData)
    res.status(200).json({ok:true, message:"Usuario creado con exito"})
    } catch (error) {
        console.log(error)
        // Aquí puedes agregar más información sobre el error para depuración
        res.status(500).json({ ok: false, message: "Error en el servidor" });
    }
}
//obtenemos todos los usuarios o empleados activos
export const getAllUser = async (req:Request, res: Response) => {
    const {jwt}=req.cookies
    try {
       if (!jwt) return res.status(401).json({ok: false, message: 'Invalid token'})
       const data = await userModel.find({"roles.seller":true})
    res.status(200).json({ok:true, data:data})
    } catch (error) {
        console.log(error)
        // Aquí puedes agregar más información sobre el error para depuración
        res.status(500).json({ ok: false, message: "Error en el servidor" });
    }
}
//obtenemos los usuarios que se les ha dado de baja
export const getAllUserDown = async (req:Request, res: Response) => {
    try {
        console.log({token: req.cookies})
       const data = await userModel.find({"roles.seller":true, isActive:false})
    res.status(200).json({ok:true, data:data})
    } catch (error) {
        console.log(error)
        // Aquí puedes agregar más información sobre el error para depuración
        res.status(500).json({ ok: false, message: "Error en el servidor" });
    }
}
//obtenemos un usuario para editarlo
export const getUserId = async (req:Request, res: Response) => {
    try {
    const user = await userModel.findById(req.params.id)
    res.status(200).json({ok:true, data:user})
    } catch (error) {
        console.log(error)
        // Aquí puedes agregar más información sobre el error para depuración
        res.status(500).json({ ok: false, message: "Error en el servidor" });
    }
}
//guardamos los datos modificados del usuario obtenido
export const updateUser = async (req:Request, res: Response) => {
    try {
       const {id} = req.params
       const {names, lastnames, email, login_code, roles} = req.body
       const isAdmin = roles === 'admin'
       let useRoles

       if (isAdmin) {
           useRoles = {admin:true, seller: false}
       } else {
          useRoles = {admin:false, seller: true}
       }
       const userData = {
        names,
        lastnames,
        email,
        login_code,
        roles: useRoles
       };
        await userModel.findByIdAndUpdate(id,userData)
    res.status(200).json({ok:true, message:"Usuario Actualizado correctamente"})
    } catch (error) {
        console.log(error)
        // Aquí puedes agregar más información sobre el error para depuración
        res.status(500).json({ ok: false, message: "Error en el servidor" });
    }
}

//dar de baja a un usuario y colocamos el isActive en false
export const userDown = async (req:Request, res: Response) => {
    try {
        const {id} = req.params
        console.log(id)
       const user = await userModel.findByIdAndUpdate(id,{isActive:false})
       console.log({user})
    res.status(200).json({ok:true, message:"Usuario dado de baja"})
    } catch (error) {
        console.log(error)
        // Aquí puedes agregar más información sobre el error para depuración
        res.status(500).json({ ok: false, message: "Error en el servidor" });
    }
}

//reintegramos un empleado que estaba de baja
export const userInteger = async (req:Request, res: Response) => {
    try {
        const {id} = req.params
       const user = await userModel.findByIdAndUpdate(id,{isActive:true})
    res.status(200).json({ok:true, message:"Usuario reintegrado nuevamemte"})
    } catch (error) {
        console.log(error)
        // Aquí puedes agregar más información sobre el error para depuración
        res.status(500).json({ ok: false, message: "Error en el servidor" });
    }
}
