import { Request, Response, NextFunction } from 'express';
import { string } from 'joi';
import jwt from 'jsonwebtoken';
import { UserInstance } from '../model/userModel';

const jwtsecret = process.env.JWT_SECRET as string;

export async function auth(req: Request | any, res: Response, next: NextFunction){
    // setting authorization header
    // using cookies
    // const authorization = req.cookies.jwt;
    // if(!authorization){
        //     return res.status(401).json({ error: "kindly sign in"})
        //  }
        //  let verified = jwt.verify(authorization, jwtsecret)
        
    const authorization = req.headers.authorization;
    if(!authorization){
       return res.status(401).json({ error: "kindly sign in"})
    }
    const token = authorization.slice(7, authorization.length)

    let verified = jwt.verify(token, jwtsecret)
    if(!verified){
        return res.status(401).json({ error: "invalid token" })
    }
    const { id } = verified as {[key: string]: string}
    
    // check if user exist
    const User = await UserInstance.findOne({where:{id}})
    if(!User){
        return res.status(401).json({ error: "Kindly sign up"})
    }
    req.user = verified
    next()
}