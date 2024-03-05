import mongoose from 'mongoose';
import "dotenv/config";
import userModel from '../models/auth';

async function dbConnect () {
    if(!process.env.MONGODB){
        console.log("no se encuentra la ruta a la conexion")
        throw new Error("la variable de entorno no existe")
    }

    try {
        mongoose.connect(process.env.MONGODB)
        console.log("Connection to DataBase was successful")

       /* await userModel.create({
            names: "ariel",
            lastnames: " hernandez",
            email: "ivens@gmail.com",
            login_code: "calderon03",
            roles: {
                admin:true,
                seller:false
            }
            
        })*/
    } catch (error) {
        console.log("hubo un error al conectarse a la base de datos" + error)
    }
}

export default dbConnect