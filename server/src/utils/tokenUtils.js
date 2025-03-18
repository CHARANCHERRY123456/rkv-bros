import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js';

const generateToken = (user)=>{
    return jwt.sign(
        {id : user.id , email : user.email , name : user.name},
        JWT_SECRET,
    )
}

export default generateToken;