import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js';

const generateToken = (user)=>{
    const token =  jwt.sign(
        {id : user.id , email : user.email , name : user.name},
        JWT_SECRET,
    )
    console.log(token);
    
    return token;
}

export default generateToken;