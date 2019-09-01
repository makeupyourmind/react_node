import jwt from 'jsonwebtoken';

export default function verifyRole(...roles) {
    
    return (req, res, next) => {
          
            jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {

                if(err){
                return res.status(401).json({message: "Invalid token"});
                }

                const hasRole = () => roles.includes(authData.user.role)
                
                if(!hasRole()){
                    return res.status(403).json({message: "You have no any permission"});
                }
                
                req.user = authData.user
                next()
                
            })
        }
    
}