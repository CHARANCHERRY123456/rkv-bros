import assignmentService from './assignment.service.js';

export const createAssignment = async (req, res, next) => {
    try {
        const assignment = await assignmentService.createAssignment(req.body);
        res.status(201).json(assignment);
    } catch (error) {
        next(error);
    }
};

export const getAllAssignments = async (req, res, next) => {
    try {
        const assignments = await assignmentService.getAllAssignments();
        res.json(assignments);
    } catch (error) {
        next(error);
    }
};

export const getAssignmentByName = async (req, res, next) => {
    try {
        const assignment = await assignmentService.getAssignmentByName(req.params.assignmentName);
        res.json(assignment);
    } catch (error) {
        next(error);
    }
};

export const submitVote = async (req, res, next) => {
    try {
        const { questionIndex, optionIndex, email } = req.body;
        const assignment = await assignmentService.submitVote(
            req.params.assignmentName,
            questionIndex,
            optionIndex,
            email
        );
        res.json(assignment);
    } catch (error) {
        next(error);
    }
};

export const resetVotes = async (req, res, next) => {
    try {
        const assignment = await assignmentService.resetVotes(req.params.assignmentName);
        res.json({ message: 'All votes reset successfully', assignment });
    } catch (error) {
        next(error);
    }
};

export const updateAssignment = async (req, res, next) => {
    try {
        const assignment = await assignmentService.updateAssignment(
            req.params.assignmentName,
            req.body
        );
        res.json(assignment);
    } catch (error) {
        next(error);
    }
};

export const deleteAssignment = async (req, res, next) => {
    try {
        const result = await assignmentService.deleteAssignment(req.params.assignmentName);
        res.json(result);
    } catch (error) {
        next(error);
    }
};
