import {Request, Response, NextFunction} from 'express'
import { http } from '../../config/http'
import { unauthorized } from '../../presentation/helpers/http-helper'

export const verifyLogger = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      
     const isValidToken = req.headers.authorization
 
  
      if (!isValidToken) {
        // const {body,statusCode} = unauthorized()
         res.status(401).json("Token Invalidol")
         return;
      }
     
      const [_, token] = isValidToken.split(" ")
     
    try {
  
    const response = await http.post('/session/verify', {}, { headers: {
          Authorization: `Bearer ${token}`
      }})

  
    
    req.body.user = response.data.user
   return next();

      } catch (error) {
        res.status(401).json({ status: 'error', message: 'not authorized' });
        return;
      }
    
} 

export const verifyEngLogger = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { user } = req.body

  if (user.nivel_de_acesso.descricao === "eng_analista" ) {
   return next()
  } else {
    res.status(401).json({ status: 'error', message: 'not authorized' });
    return;
  } 
}


export const verifyPCPlogger = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { user } = req.body
  if (   
        user.nivel_de_acesso.descricao === "pcp_injecao"  
       || user.nivel_de_acesso.descricao === "pcp_acabamento"
       || user.nivel_de_acesso.descricao === "pcp"

   
       ) {
      return next()
  }else{
   res.status(401).json({ status: 'error', message: 'not authorized' });
  return;
  }

} 