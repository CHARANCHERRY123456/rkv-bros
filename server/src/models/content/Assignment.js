import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },

    folder : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Folder",
        required : true
    },
    questions : [{
        questionText : String,
        options : [String],
        correctAnswer : [Number],
        responses: [{ 
            optionIndex: Number,
            count: { type: Number, default: 0 }
         }],
    }]
})

const Assignment = mongoose.model("Assignment" , assignmentSchema);

export default Assignment;