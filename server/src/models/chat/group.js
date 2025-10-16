import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    members :{
        type : [String],
        required : true
    },
    description: {
        type: String,
        default: null
    },
    createdBy: {
        type: String,
        default: null
    },
    lastActivity: {
        type: Date,
        default: Date.now
    }
},{timestamps:true});

groupSchema.index({ members: 1 });
groupSchema.index({ lastActivity: -1 });

const Group = mongoose.model("Group",groupSchema);
export default Group;