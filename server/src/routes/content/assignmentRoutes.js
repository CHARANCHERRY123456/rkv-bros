import express from 'express';
import Assignment from '../../models/content/Assignment.js';
import {ADMIN} from '../../config/config.js';

const router = express.Router();

// CREATE - Add new assignment (Admin only)
router.post('/', async (req, res) => {
  try {
    console.log("Hi i am here");
    const newAssignment = new Assignment(req.body);

    const savedAssignment = await newAssignment.save();
    res.status(201).json(savedAssignment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ - Get all assignments
router.get('/', async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ - Get specific assignment
router.get('/:assignmentName', async (req, res) => {
  try {
    const assignment = await Assignment.findOne({ assignmentName: req.params.assignmentName });
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE - Submit vote
router.post('/:assignmentName/vote', async (req, res) => {
  const { questionIndex, optionIndex, email } = req.body;

  // Input validation
  if (!email || typeof questionIndex !== 'number' || typeof optionIndex !== 'number') {
    return res.status(400).json({ message: 'Invalid request body' });
  }

  try {
    const assignment = await Assignment.findOne({ assignmentName: req.params.assignmentName });
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

    // Validate indices
    if (questionIndex >= assignment.questions.length || optionIndex >= assignment.questions[questionIndex]?.options?.length) {
      return res.status(400).json({ message: 'Invalid question or option index' });
    }

    const question = assignment.questions[questionIndex];
    const option = question.options[optionIndex];

    // Admin logic
    if (email === ADMIN) {
      question.adminChoice = question.adminChoice.includes(optionIndex)
        ? question.adminChoice.filter(index => index !== optionIndex)
        : [...question.adminChoice, optionIndex];
    } 
    // Regular user logic
    else {
      option.selections = option.selections || {};
      const hasVoted = option.selections[email];
      
      if (hasVoted) {
        option.voteCount -= 1;
        question.totalVotes -= 1;
        delete option.selections[email];
      } else {
        option.voteCount += 1;
        question.totalVotes += 1;
        option.selections[email] = true;
      }
    }

    assignment.markModified('questions');
    await assignment.save();
    res.json(assignment);
    
  } catch (err) {
    console.error('Vote toggle error:', process.env.NODE_ENV === 'development' ? err : err.message);
    res.status(500).json({ 
      message: 'Failed to process vote toggle',
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  }
});

router.put('/:assignmentName/reset-votes', async (req, res) => {
  try {
    const assignment = await Assignment.findOne({ "assignmentName"  : req.params.assignmentName});
    console.log(assignment);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Reset all vote counts
    assignment.questions.forEach(question => {
      question.options.forEach(option => {
        option.voteCount = 0;
        option.selections = {}; // Also clear selections if needed
      });
      question.totalVotes = 0;
    });

    await assignment.save();
    console.log("after assignment" , assignment);
    
    res.json({ message: 'All votes reset successfully', assignment });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting votes', error });
  }
});



// UPDATE - Modify assignment (Admin only)
router.put('/:assignmentName', async (req, res) => {
  try {
    const updatedAssignment = await Assignment.findOneAndUpdate(
      { assignmentName: req.params.assignmentName },
      req.body,
      { new: true }
    );
    if (!updatedAssignment) return res.status(404).json({ message: 'Assignment not found' });
    res.json(updatedAssignment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Remove assignment (Admin only)
router.delete('/:assignmentName', async (req, res) => {
  try {
    const deletedAssignment = await Assignment.findOneAndDelete({ assignmentName: req.params.assignmentName });
    if (!deletedAssignment) return res.status(404).json({ message: 'Assignment not found' });
    res.json({ message: 'Assignment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;