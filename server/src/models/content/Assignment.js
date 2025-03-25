import mongoose from "mongoose";

const AssignmentSchema = new mongoose.Schema({
  assignmentName: {
    type: String,
    required: true
  },
  courseId: {
    type: String,
    required: true
  },
  questions: [
    {
      questionText: {
        type: String,
        required: true
      },
      questionType: {
        type: String,
        enum: ['mcq', 'numeric', 'text'],
        default: 'mcq'
      },
      options: [
        {
          optionText: String,
          voteCount: {
            type: Number,
            default: 0
          }
        }
      ],
      adminChoice: Number, // index of correct option
      totalVotes: {
        type: Number,
        default: 0
      }
    }
  ]
}, { timestamps: true });

export default mongoose.model('Assignment', AssignmentSchema);