
import { Schema, model } from "mongoose"


const userSchema = new Schema({
 names: {type:String, required:true},
 lastnames:{type:String, required:true},
 email: {type:String, required:true, unique:true},
 login_code: {type:String, required:true},
 isActive : {type:Boolean, default:true},
 roles: {type: {
    admin:{type: Boolean},
    seller: {type: Boolean},
 }, require: true}
})

const userModel = model('user', userSchema, "users")
export default userModel