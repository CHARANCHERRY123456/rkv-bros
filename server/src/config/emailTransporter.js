import nodemailer from 'nodemailer';
import { EMAIL , EMAIL_PASS } from './config.js';

const transporter = nodemailer.createTransport({
    service : "gmail",
    auth:{
        user : EMAIL,
        pass:EMAIL_PASS
    },
    debug:true,
});



export default transporter;