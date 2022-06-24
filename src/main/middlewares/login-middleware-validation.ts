import {Request, Response, NextFunction} from 'express'
import { http } from '../../config/http'
import { unauthorized } from '../../presentation/helpers/http-helper'

export const verifyLogger = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const isValidToken = req.headers.authorization
      if (!isValidToken) {
        const {body,statusCode} = unauthorized()
         res.status(statusCode).json(body)
      }
      const [_, token] = isValidToken.split(" ")
      try {
        const response = await http.post('/session/verify', {}, { headers: {
          Authorization: `Bearer ${token}`
      }})

    if (response.status == 401) {
         res.status(401).json({ status: 'error', message: 'not authorized' });
    }

    const authorization = response.data.user.User_Sistema.find(us => us.sistema.descricao === "RRIM") && response.data.user.status

    if (!authorization) {
         res.status(401).json({ status: 'error', message: 'not authorized' });
    }
       next();

      } catch (error) {
        res.status(401).json({ status: 'error', message: 'not authorized' });
      }
    
} 