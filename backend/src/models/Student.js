import mongoose from 'mongoose';
import crypto from 'crypto'
const studentSchema = new mongoose.Schema({
  batch: { type: String }, 
  sid: { type: String, unique: true , required:true }, 
  name: { type: String  },
  gender: { type: String, enum: ['MALE', 'FEMALE', 'OTHER'] },
  cetHtNo: { type: String},
  stream: { type: String  },
  classP1: { type: String },
  caste: { type: String },
  classP2: { type: String },
  dob: { type: Date }, 
  father: { type: String },
  mandal: { type: String },
  district: { type: String },
  school: { type: String },
  phone2: { type: String },
  ssc: { type: String },
  sscBoard: { type: String },
  phone: { type: String },
  mother: { type: String },
  bloodGroup: { type: String },
  parent: { type: String },
  address: { type: String },
  p1s1 : {type : Number},
  p1s2 : {type : Number},
  p2s1 : {type : Number},
  p2s2 : {type : Number},
  pucCgpa : {type : Number},
  e1sem1: { type: Number }, 
  e1sem2: { type: Number }, 
  e2sem1: { type: Number }, 
  e2sem2: { type: Number }, 
  branch: { type: String },
  cgpa: { type: Number }, 
  image: { type: String },
  rank: { type: Number }, 
  email: { type: String },
  createdAt: { type: Date, default: Date.now }, 
  updatedAt: { type: Date, default: Date.now }, 
});


studentSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Student = mongoose.model('Student', studentSchema);

export default Student;