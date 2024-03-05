import express from "express";
import { createClient, getAllClient, getByIdClient, updateClient } from "../../controllers/client";

 
 const router = express.Router();
 router.post('/client', createClient)
 router.get('/clients', getAllClient)
 router.get('/client/:_id', getByIdClient)
 router.put('/client/:_id', updateClient)

 export default router