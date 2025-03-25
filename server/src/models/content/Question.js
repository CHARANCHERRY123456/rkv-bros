import mongoose from "mongoose";

const AssignmentSchema = new mongoose.Schema({
  
  assignmentName  : {
    type : String,
    required : true
  },

  questions : [
    {
      questionText : {
        type : String,
        required : true
      },

      options : [
        {
          optionText : {
            type : String  ,
            required  : true
          },
        }
      ],
      adminChoice : {
        type : Number , // to store the index of the answers
      },

      userVotes :[{
        optionIndex : {type : Number}, // shows which option
        optionCount : {type : Number} // how many votes each 
      }],

      totalNumberOfVotes : {type : Number},
      
      createdAt : {
        type : Date(),
        default : Date.now()
      }

    }

  ]

})
