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
  const { questionIndex, optionIndex , email} = req.body;
  console.log(email);
  
  try {
    const assignment = await Assignment.findOne({ assignmentName: req.params.assignmentName });
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    
    const question = assignment.questions[questionIndex];
    const option = question.options[optionIndex];
    // Check if the user has already voted
    if (option.selections[email]) {
        console.log("user alradu exist");
        return res.status(400).json(assignment);
    }
    question.options[optionIndex].voteCount += 1;
    question.totalVotes += 1;
    question.options[optionIndex].selections[email] = true;
    
    await assignment.save();
    res.json(assignment);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
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