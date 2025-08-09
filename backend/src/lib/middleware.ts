import { Request,Response,NextFunction } from "express"
import jwt from "jsonwebtoken"

export function middleware(req:Request,res:Response,next:NextFunction){
  const token = req.cookies.token;
  const decoded=jwt.verify(token,process.env.JWT_SECRET!)
  if(decoded){
    //@ts-ignore
    req.id=decoded.id
    next()
  }else{
    res.status(403).json({
       Error:"unauthorized"
    })
  }
}