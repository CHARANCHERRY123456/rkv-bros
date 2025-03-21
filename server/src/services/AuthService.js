// for current i am not using the bycrypt passoword
import bycrypt from 'bcryptjs';
import axios from 'axios';
import generateToken from '../utils/tokenUtils.js';
import transporter from '../config/emailTransporter.js';
import UserRepository from '../repositories/UserRepository.js';
import { storeOTP , getOTP , deleteOTP } from '../utils/otpSotrage.js';
import { EMAIL , EMAIL_PASS } from '../config/config.js';

export default class AuthService{
    constructor(){
        this.repository = new UserRepository();
    }

    registerUser = async(data)=>{
        try {
            const { name, email, password } = data;
            if (!name || !email || !password)
                throw new Error("All fields are required");
            const existingUser = await this.repository.findOne({email : email});
            // if(existingUser) throw new Error(`User already exists`);
            const user = await this.repository.createUser(data);
        } catch (error) {
            throw Error(`Error while creating User :${error.message} `);
        }
    };

    loginUser = async (data)=>{
        try {
            console.log(data.email, "is trying to login");
            const user = await this.repository.findOne({email : data.email});
            console.log("User exists");
            if(!user){
                console.log("user not found");
                 throw new Error(`User not found`);
            }
    
            if(data.password != user.password) {
                console.log("passowrd does not matched");
                throw new Error(`Passowrd not matched`);
            }
            const token = generateToken(user);
            console.log(token , " token is seding");
            return token;
        } catch (error) {
            throw Error(`Error while logging User :${error.message} `);
        }
    };

    googleLogin = async (data)=>{
        try {
            const googleRes = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${data.token}`);
            const googleData = googleRes.data;
    
            let user = await this.repository.findOne({email : googleData.email});
            if(!user) user = await this.repository.createUser(googleData);
            return generateToken(user);
        } catch (error) {
            throw Error(`Error while google logging User :${error.message} `);
        }
    }

    sendOtp = async (email) => {
        if (!email) throw new Error("Email is required");
    
        try {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            storeOTP(email, otp);
            const mailOptions = {
                from: EMAIL,
                to: email,
                subject: "Email Verification OTP",
                text: `Your verification code is: ${otp}`,
            };
            
            await transporter.sendMail(mailOptions);
            console.log(otp);
            return otp; // Return OTP if successfully sent
    
        } catch (error) {
            throw Error(`Failed to send OTP: ${error.message}`);
        }
    };
    
    
}

