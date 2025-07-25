import jwt from 'jsonwebtoken'
import config from '../config/env.js'

export function authtenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[0];

    if(token == null) return res.sendStatus(401);

    jwt.verify(token, config.JWT_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
    
}