import Assignment from '../../models/content/Assignment.js'
// Fetch all assignments in a folder
export const getAssignmentsByFolder = async (req, res) => {
    try {
        const { folder } = req.query;
        const assignments = await Assignment.find({ folder });
        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Submit a response (vote)
export const submitResponse = async (req, res) => {
    try {
        const { assignmentId, questionIndex, selectedOption } = req.body;

        // Find the assignment
        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) return res.status(404).json({ message: "Assignment not found" });

        // Find the specific question
        const question = assignment.questions[questionIndex];
        if (!question) return res.status(404).json({ message: "Question not found" });

        // Find the response index
        const responseIndex = question.responses.findIndex(r => r.optionIndex === selectedOption);

        if (responseIndex !== -1) {
            // If option exists, increment count
            question.responses[responseIndex].count += 1;
        } else {
            // Otherwise, create a new response entry
            question.responses.push({
                optionIndex: selectedOption,
                count: 1
            });
        }

        // Save updated assignment
        await assignment.save();

        res.status(200).json({ message: "Response submitted successfully", updatedAssignment: assignment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
