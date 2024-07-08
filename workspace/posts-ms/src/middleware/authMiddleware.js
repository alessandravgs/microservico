import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).json({ error: 'Token inválido' });

    const token = authHeader.split(' ')[1];

    if (!token) 
        return res.status(401).json({ error: 'Formato do token inválido' });

    
    jwt.verify(token, process.env.PRIVATE_KEY, (error, decoded) => {
        if (error) 
            return res.status(403).json({ error: 'Token inválido ou expirado' });       

        req.user = decoded;
        next();
    });
};

