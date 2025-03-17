import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  batch: { type: String, default: "R20" }, 
  sid: { type: String, unique: true, required: true }, 
  name: { type: String},
  gender: { type: String, enum: ['MALE', 'FEMALE', 'OTHER'], default: "OTHER" },
  cetHtNo: { type: String, default: "Not available" },
  stream: { type: String, default: "Not availble" },
  classP1: { type: String, default: "not available" },
  caste: { type: String, default: "not available" },
  classP2: { type: String, default: "not available" },
  dob: { type: String, default : "Not available" }, 
  father: { type: String, default: "not available" },
  mandal: { type: String, default: "not available" },
  district: { type: String, default: "not available" },
  school: { type: String, default: "not available" },
  phone2: { type: String, default: "not available" },
  ssc: { type: String, default: "not available" },
  sscBoard: { type: String, default: "not available" },
  phone: { type: String, default: "not available" },
  mother: { type: String, default: "not available" },
  bloodGroup: { type: String, default: "not available" },
  parent: { type: String, default: "not available" },
  address: { type: String, default: "not available" },
  p1s1: { type: Number, default: 0 },
  p1s2: { type: Number, default: 0 },
  p2s1: { type: Number, default: 0 },
  p2s2: { type: Number, default: 0 },
  pucCgpa: { type: Number, default: 0 },
  e1sem1: { type: Number, default: 0 }, 
  e1sem2: { type: Number, default: 0 }, 
  e2sem1: { type: Number, default: 0 }, 
  e2sem2: { type: Number, default: 0 }, 
  branch: { type: String, default: "not available" },
  cgpa: { type: Number, default: 0 }, 
  image: { type: String, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnnlPrt8agZZagN8LpfEf-t3qdnHA06iPpU1GegB_VEx7CF0cGCcnp-4g28g3pooAMZhs&"},
  rank: { type: Number, default: 0 }, 
  email: { type: String, default: "not available" },
  createdAt: { type: Date, default: Date.now }, 
  updatedAt: { type: Date, default: Date.now }, 
});

studentSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
