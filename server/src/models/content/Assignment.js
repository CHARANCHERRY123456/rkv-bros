import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    folder : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Folder",
        required : true
    },
    questions : [{
        questionText : String,
        optins : [String],
        correctAnswer : [Number],
        responses : [Number]
    }]
})

const Assignment = mongoose.model("Assignment" , assignmentSchema);

export default Assignment;