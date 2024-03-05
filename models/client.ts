import  { Schema, model } from "mongoose";

const clientSchema = new Schema({
    names: {type: String , required:true},
    lastnames: {type: String , required:true},
    phone_number: {type: String, required:true, unique:true},
    departament: {type: String ,require:true},
    city: {type: String },
    street: {type: String , required:true},
})

const clientModel = model('Client', clientSchema, 'clients')
export default clientModel