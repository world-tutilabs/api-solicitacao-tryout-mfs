const jwt = require('jsonwebtoken');
const secret = require('./secret');

module.exports = function(req,res,next){
    const authToken = req.headers['authorization'];
 
    if(authToken != undefined){
        
        const bearer = authToken.split(" ");
        const token  = bearer[1];
        try {
            const decoded = jwt.verify(token,secret);
            //Se Auth Role for Administrador
            if(decoded.role == 2){
                next();
            }else{
                res.status(403);
                res.json({error:"Voce não Tem Permissão para Acessar esta rota!"});
                return;
            }
             
        } catch (error) {
            res.status(403);
            res.json({error:"Voce não está autenticado"});
            return;
        }
    }else{
        res.status(403);
        res.json({error:"Voce não está autenticado"});
        return;
    }
   
}