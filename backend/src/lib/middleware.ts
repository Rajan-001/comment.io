import { Request,Response,NextFunction } from "express"
import jwt from "jsonwebtoken"

export function middleware(req:Request,res:Response,next:NextFunction){

  
  try
  {
    const token= req.cookies.token
    console.log("JWT is here ",process.env.JWT_SECRET!)
   console.log("token is here ",token)
  const decoded=jwt.verify(token,process.env.JWT_SECRET!)
  console.log(decoded)
  if(decoded){
    //@ts-ignore
    req.id=decoded.userId
    next()
  }else{
    res.status(403).json({
       Error:"unauthorized"
    })
  }
}
catch(err)
{
  res.status(411).json({
    Error:"undefined token"
  })
}
}