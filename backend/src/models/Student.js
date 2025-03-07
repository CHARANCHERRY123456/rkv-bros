import mongoose from 'mongoose';
import crypto from 'crypto'
const studentSchema = new mongoose.Schema({
  batch: { type: String }, 
  id: { type: String, unique: true , required:true }, 
  password : {type : String , required : true , default : crypto.randomBytes(16).toString('hex')},
  name: { type: String  , default : "No Name is Provided" }, 
  gender: { type: String, enum: ['MALE', 'FEMALE', 'OTHER'] },
  cetHtNo: { type: String, unique: true , default:"No Hall Ticket available" }, 
  stream: { type: String  , default : "Un available Stream" }, 
  classP1: { type: String , default : "PUC1" }, 
  caste: { type: String , default:"Not available" }, 
  classP2: { type: String , default: "Not available"}, 
  dob: { type: Date }, 
  father: { type: String , default: "Not available"  }, 
  mandal: { type: String , default: "Not available" }, 
  district: { type: String , default: "Not available" }, 
  school: { type: String , default: "Not available" }, 
  phone2: { type: String , default: "Not available", }, 
  ssc: { type: String , default: "Not available" }, 
  sscBoard: { type: String , default: "Not available" }, 
  phone: { type: String , default: "Not available" }, 
  mother: { type: String , default: "Not available" }, 
  bloodGroup: { type: String , default: "Not available"}, 
  parent: { type: String , default: "Not available" }, 
  address: { type: String , default: "Not available" }, 
  p1s1 : {type : Number},
  p1s2 : {type : Number},
  p2s1 : {type : Number},
  p2s2 : {type : Number},
  pucCgpa : {type : Number},
  e1sem1: { type: Number }, 
  e1sem2: { type: Number }, 
  e2sem1: { type: Number }, 
  e2sem2: { type: Number }, 
  branch: { type: String , default: "Not available" }, 
  cgpa: { type: Number }, 
  image: { type: String , default: "Not available" }, 
  rank: { type: Number }, 
  email: { type: String , default: "Not available", unique: true }, 
  createdAt: { type: Date, default: Date.now }, 
  updatedAt: { type: Date, default: Date.now }, 
});


studentSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;