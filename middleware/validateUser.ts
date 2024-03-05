import { Request, Response, NextFunction } from "express"
import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from "jsonwebtoken"
import "dotenv/config";
interface CustomRequest extends Request {
    user?: User; // Define la propiedad 'user' en la interfaz CustomRequest
}

interface User{
    sub: string,
    name: string,
    email: string,
}
export const validateUser = () => {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        try {
           console.log("Protexted") 
           const token = req.cookies.jwt
           const user:any = jwt.verify(token, process.env.SECRET_KEY as string)
           req.user = user
           console.log(req.user)
           next()
        } catch (error) {
          if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                return res.status(401).json({ok:false, message: error.message});
          } res.status(500).json({ ok: false, message: "error in server from middleware" })
        }
    }
}