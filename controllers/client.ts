import { Request, Response } from "express";
import clientModel from "../models/client";

export const createClient = async(req:Request, res:Response)=>{
    try {
        const {phone_number} = req.body
        const client = await clientModel.findOne({phone_number})
        if(client){return res.status(401).json({ok:false, message:"ya existe un cliente con este numero de telefono"})}
        await clientModel.create(req.body)
        console.log({client})
        res.status(200).json({ok:true, message:"cliente creado exitosamente"})
    } catch (error) {
        res.status(500).json({ok:false, message:"error del servidor en clientes"})
    }
}

export const getAllClient = async(req:Request, res:Response)=>{
    try {
        const client = await clientModel.find()
        res.status(200).json({ok:true, data:client})
    } catch (error) {
        res.status(500).json({ok:false, message:"error del servidor en clientes"})
    }
}

export const getByIdClient = async(req:Request, res:Response)=>{
    try {
        const {_id} = req.params
        const client = await clientModel.findById(_id)
        res.status(200).json({ok:true, data:client})
    } catch (error) {
        res.status(500).json({ok:false, message:"error del servidor en clientes"})
    }
}

export const updateClient = async(req:Request, res:Response)=>{
    try {
        const {_id} = req.params;
        await clientModel.findOneAndUpdate({_id}, req.body)
        res.status(200).json({ok:true, message:"Cliente actualizado correctamente"})
    } catch (error) {
        res.status(500).json({ok:false, message:"error del servidor en clientes"})
    }
}

