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
router.get('/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE - Submit vote
router.post('/:id/vote', async (req, res) => {
  const { questionIndex, optionIndex } = req.body;
  
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    
    const question = assignment.questions[questionIndex];
    question.options[optionIndex].voteCount += 1;
    question.totalVotes += 1;
    
    await assignment.save();
    res.json(assignment);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

// UPDATE - Modify assignment (Admin only)
router.put('/:id', async (req, res) => {
  try {
    const updatedAssignment = await Assignment.findByIdAndUpdate(
      req.params.id,
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
router.delete('/:id', async (req, res) => {
  try {
    const deletedAssignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!deletedAssignment) return res.status(404).json({ message: 'Assignment not found' });
    res.json({ message: 'Assignment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;