// for current i am not using the bycrypt passoword
import bycrypt from 'bcryptjs';
import axios from 'axios';
import generateToken from '../utils/tokenUtils.js';
import UserRepository from '../repositories/UserRepository.js';


export default class AuthService{
    constructor(){
        this.repository = new UserRepository();
    }

    registerUser = async(data)=>{
        try {
            const existingUser = await this.repository.findOne({email : data.email});
            if(existingUser) throw new Error(`User already exists`);
            const user = await this.repository.createUser(data);
        } catch (error) {
            throw Error(`Error while creating User :${error.message} `);
        }
    };

    loginUser = async (data)=>{
        try {
            const user = await this.repository.findOne({email : data.email});
            if(!user) throw new Error(`User not found`);
    
            if(data.password != user.password) throw new Error(`Passowrd not matched`);
    
            return generateToken(user);
        } catch (error) {
            throw Error(`Error while logging User :${error.message} `);
        }
    };

    googleLogin = async (data)=>{
        try {
            const googleRes = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`);
            const googleData = googleRes.data;
    
            let user = await this.repository.findOne({email : googleData.email});
            if(!user) user = await this.repository.createUser(googleData);
    
            return generateToken(user);
        } catch (error) {
            throw Error(`Error while google logging User :${error.message} `);
        }
    }


}

