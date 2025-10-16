import mongoose from "mongoose";

const AssignmentSchema = new mongoose.Schema({
  assignmentName: {
    type: String,
    required: true,
    unique: true
  },
  courseId: {
    type: String,
  },
  dueDate : {
    type : String,
    default : "Wed"
  },
  questions: [
    {
      questionNumber : Number,
      questionText: {
        type: String,
        required: true
      },
      questionType: {
        type: String,
        default: 'mcq'
      },
      options: [
        {
          optionText: String,
          selections : {
            type : Object ,
            default : {} // email : isSelected
          },
          voteCount: {
            type: Number,
            default: 0
          }
        }
      ],
      adminChoice: [Number], // index of correct option(s)
      totalVotes: {
        type: Number,
        default: 0
      }
    }
  ]
}, { timestamps: true });

export default mongoose.model('Assignment', AssignmentSchema);
