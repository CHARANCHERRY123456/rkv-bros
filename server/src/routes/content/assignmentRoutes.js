import express from 'express';
import Assignment from '../../models/content/Assignment.js'

const router = express.Router();

// CREATE - Add new assignment (Admin only)
router.post('/', async (req, res) => {
  try {
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
  
  try {
    // 1. Find the assignment
    const assignment = await Assignment.findOne({ assignmentName: req.params.assignmentName });
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

    // 2. Validate indices
    if (questionIndex >= assignment.questions.length || optionIndex >= assignment.questions[questionIndex].options.length) {
      return res.status(400).json({ message: 'Invalid question or option index' });
    }

    // 3. Get references to the question and option
    const question = assignment.questions[questionIndex];
    const option = question.options[optionIndex];

    // 4. Initialize selections if it doesn't exist
    if (!option.selections) {
      option.selections = {};
    }

    // 5. Toggle logic
    const hasVoted = option.selections[email];
    
    if (hasVoted) {
      // User already voted - remove their vote
      option.voteCount -= 1;
      question.totalVotes -= 1;
      delete option.selections[email];
    } else {
      // User hasn't voted - add their vote
      option.voteCount += 1;
      question.totalVotes += 1;
      option.selections[email] = true;
    }

    // 6. Mark the change
    assignment.markModified('questions');

    // 7. Save and return the updated assignment
    await assignment.save();
    res.json(assignment);
    
  } catch (err) {
    console.error('Vote toggle error:', err);
    res.status(500).json({ 
      message: 'Failed to process vote toggle',
      error: err.message 
    });
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