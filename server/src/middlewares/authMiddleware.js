import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js';
const authMiddleware = (req , res , next)=>{
    const token = req.header("Authorization");

    if(!token) return res.status(401).json({message : "Access denied"});
    
    try {
        const decoded = jwt.verify(token , JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({message : "Invalid token"});
    }
}

export default authMiddleware; 